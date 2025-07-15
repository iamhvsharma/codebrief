"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import Image from "next/image";
import React, { useState } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "./code-references";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFilesReferences([]);
    e.preventDefault();
    if (!project?.id) return;
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-background flex max-h-[85vh] w-full flex-col overflow-hidden rounded-2xl border p-6 shadow-xl sm:max-w-[80vw]">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <Image src="/logo.svg" alt="CodeBrief" width={36} height={36} />
            <h2 className="text-foreground text-xl font-semibold">
              CodeBrief Answer
            </h2>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 space-y-6 overflow-y-auto px-4">
            {/* Answer Markdown */}
            <div
              data-color-mode="light"
              className="prose prose-sm max-w-[70vw]"
            >
              <MDEditor.Markdown
                source={answer}
                style={{
                  backgroundColor: "transparent",
                  padding: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Code References */}
            {filesReferences.length > 0 && (
              <div>
                <CodeReferences filesReferences={filesReferences} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-border flex justify-end border-t pt-4">
            <Button
              variant="outline"
              className="bg-primary text-white hover:text-black"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle> Ask a question </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler}>
            <Textarea
              placeholder="Eg: Which file I should change to edit the homepage."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <div className="h-4"></div>
            <Button type="submit" disabled={loading}>
              Ask CodeBrief
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
