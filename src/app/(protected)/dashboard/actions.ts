"use server";

import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateEmbedding } from "@/lib/gemini";
import { db } from "@/server/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function askQuestion(question: string, projectId: string) {
  const stream = createStreamableValue();

  const queryVector = await generateEmbedding(question);
  const vectorQuery = `[${queryVector.join(",")}]`;

  const result = (await db.$queryRaw`
  SELECT "fileName", "sourceCode", "summary",
  1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
  FROM "SourceCodeEmbedding"
  WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
  AND "projectId" = ${projectId}
  ORDER BY similarity DESC
  LIMIT 10
  `) as {
    fileName: string;
    sourceCode: string;
    summary: string;
    similarity: number;
  }[];

  let context = "";

  for (const doc of result) {
    context += `source: ${doc.sourceCode} \n code content: ${doc.sourceCode} \n summary of file: ${doc.summary}`;
  }

  let finalAnswer = ""; // ✅ Accumulate streamed answer

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-1.5-flash"),
      prompt: `
        You are an AI code assistant designed to help new developers and interns onboard quickly and effectively onto a codebase or project.

        You possess expert-level knowledge in software development and are capable of answering detailed technical questions with clarity and precision. Your personality traits include professionalism, friendliness, helpfulness, and articulate communication. You behave respectfully, inspire confidence, and respond with thoughtful, vivid, and actionable guidance.

        Your mission is to assist developers by answering their code-related queries in a way that helps them understand not only *what* to do, but *why* it works. You aim to be a reliable mentor, reducing confusion and accelerating onboarding.

        If a question is about code or a specific file, provide a **detailed, step-by-step explanation**. Include file paths, code snippets, and technical reasoning where appropriate.

        ---

        ### CONTEXT BLOCK  
        ${context}  
        ### END OF CONTEXT BLOCK  

        ### QUESTION  
        ${question}  
        ### END OF QUESTION  

        ---

        **Instructions:**

        - Always take the CONTEXT BLOCK into account when answering.
        - If the answer cannot be inferred from the provided context, respond with:  
        👉 *"I'm sorry, but I don't have enough information in the current context to answer this question."*
        - Do **not** apologize for prior responses. If new information has become available, simply integrate it and answer accordingly.
        - Do **not** invent answers or hallucinate. Only respond with information that is directly supported by the context or general programming best practices.
        - Respond in **clear markdown syntax** with formatted code snippets, bullet points, or lists where needed.
        - Be as **detailed and accurate** as possible while keeping the tone encouraging and kind.

        `,
    });
    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return {
    output: stream.value,
    filesReferences: result,
  };
}
