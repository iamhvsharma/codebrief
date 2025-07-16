"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions?.[questionIndex];

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4"></div>
      <h1 className="text-xl font-semibold">Saved Questions</h1>
      <div className="h-2"></div>
      <div className="flex flex-col gap-2">
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={question.id}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="shadow-border flex items-center gap-4 rounded-lg bg-white p-4">
                  <img
                    src={question.user.imageUrl ?? ""}
                    alt="avatar"
                    className="rounded-full"
                    height={30}
                    width={30}
                  />
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="text-xs whitespace-nowrap text-gray-400">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
            </React.Fragment>
          );
        })}
      </div>

      {question ? (
        <SheetContent className="sm:max-w-[80vw] overflow-y-scroll">
          <SheetHeader>
            <SheetTitle>{question.question}</SheetTitle>
            <div
              data-color-mode="light"
              className="prose prose-sm max-w-[70vw]"
            >
              <MDEditor.Markdown
                source={question.answer}
                style={{
                  backgroundColor: "transparent",
                  padding: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              />
              <CodeReferences
                filesReferences={
                  (question.filesReferences ?? []) as {
                    fileName: string;
                    sourceCode: string;
                    summary: string;
                  }[]
                }
              />
            </div>
          </SheetHeader>
        </SheetContent>
      ) : null}
    </Sheet>
  );
};

export default QAPage;
