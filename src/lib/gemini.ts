import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const aisummarizeCommit = async (diff: string) => {
  // https://github.com/iamhvsharma/onevote/{commitId}.diff
  const response = await model.generateContent([
       `You are an expert programmer tasked with summarizing a git diff.

        Below are some important reminders about the git diff format:

        Each file's diff starts with metadata lines:

        css
        Copy
        Edit
        diff --git a/lib/index.js b/lib/index.js
        index aadf691..bfef603 100644
        --- a/lib/index.js
        +++ b/lib/index.js
        This means that lib/index.js was modified.

        The changes follow these conventions:

        Lines starting with + were added

        Lines starting with - were removed

        Lines starting with neither + nor - are context lines

        Your Task:
        Summarize the changes made in the following git diff. Your summary should:

        Be concise and clear

        Reflect the actual purpose of the changes

        Avoid copying raw code

        Mention relevant file names (if there's just one or two)

        Skip unnecessary metadata or boilerplate

        Example Summary Comments:
        pgsql
        Copy
        Edit
        * Increased returned recordings from '10' to '100' [recordings_api.ts]
        * Fixed a typo in the GitHub Action workflow name [gpt-commit-summarizer.yml]
        * Moved Octokit initialization to its own file [src/octokit.ts]
        * Added OpenAI API integration for completions [utils/apis/openai.ts]
        * Adjusted numeric tolerance for tests
        Now, please summarize the following diff file:

        Copy
        Edit
        ${diff}`,
  ]);

  return response.response.text();
};
