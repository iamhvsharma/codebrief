import { db } from "@/server/db";
import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const githubUrl = "https://github.com/docker/gen-ai-stack";

type Response = {
  commitMessage: String;
  commitHash: String;
  commitAuthorName: String;
  commitAuthorAvatar: String;
  commitDate: String;
};

export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const { data } = await octokit.rest.repos.listCommits({
    owner: "iamhvsharma",
    repo: "onevote",
  });

  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  ) as any[];

  return sortedCommits.slice(0, 10).map((commit: any) => ({
    commitHash: commit.sha,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author?.date ?? "",
  }));
};

export const pollCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchProjectGitubUrl(projectId);
  const commitHashes = await getCommitHashes(githubUrl);

  const unProcessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
};

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
