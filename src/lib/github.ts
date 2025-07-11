import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { headers } from "next/headers";
import { aisummarizeCommit } from "./gemini";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type Response = {
  commitMessage: String;
  commitHash: String;
  commitAuthorName: String;
  commitAuthorAvatar: String;
  commitDate: String;
};

// Get Commit Function to get all the commits of a repo, sort with date time order and get slice to get latest 10 commits
export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const [owner, repo] = githubUrl.split("/").slice(-2);

  if (!owner || !repo) {
    throw new Error("Invalid github url.");
  }

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  ) as any[];

  return sortedCommits.slice(0, 10).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author?.date ?? "",
  }));
};

// Poll Commit Function, gets projectId and based on that finds the github url and project details from DB & calls unprocessedCommits function to get unprocessedCommits
export const pollCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchProjectGitubUrl(projectId);
  const commitHashes = await getCommitHashes(githubUrl);

  const unProcessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );

  const summaryResponses = await Promise.allSettled(
    unProcessedCommits.map((commit) => {
      return summarizeCommit(githubUrl, commit.commitHash as string);
    }),
  );

  const summaries = summaryResponses.map((response) => {
    if (response.status === "fulfilled") {
      return response.value;
    }

    return "";
  });

  const commits = await db.commit.createMany({
    data: summaries.map((summary, index) => {
      return {
        projectId: projectId,
        commitHash: String(unProcessedCommits[index]?.commitHash ?? ""),
        commitMessage: String(unProcessedCommits[index]?.commitMessage ?? ""),
        commitAuthorName: String(
          unProcessedCommits[index]?.commitAuthorName ?? "",
        ),
        commitAuthorAvatar: String(
          unProcessedCommits[index]?.commitAuthorAvatar ?? "",
        ),
        commitDate: String(unProcessedCommits[index]?.commitDate ?? ""),
        summary: summary,
      };
    }),
  });

  return commits;
};

// fetchProjecGithubUrl - This function actually makes DB call to get the project details from database and returns project details and github url
export const fetchProjectGitubUrl = async (projectId: string) => {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
    select: {
      githubUrl: true,
    },
  });

  if (!project?.githubUrl) {
    throw new Error("Project has no github url");
  }
  return { project, githubUrl: project?.githubUrl };
};

// This function filters out the unprocessedCommits & returns
async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: Response[],
) {
  const processedCommits = await db.commit.findMany({
    where: {
      projectId,
    },
  });

  const unProcessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommits) => processedCommits.commitHash === commit.commitHash,
      ),
  );
  return unProcessedCommits;
}

// AI Summarizer function to summarize unprocessedCommits
export const summarizeCommit = async (
  githubUrl: string,
  commitHash: string,
) => {
  // get the diff, then pass the diff into ai
  const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
    },
  });

  return (await aisummarizeCommit(data)) || "";
};
