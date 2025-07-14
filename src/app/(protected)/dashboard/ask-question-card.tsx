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

    e.preventDefault();
    if (!project?.id) return;
    setLoading(true);
    setOpen(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Image src="/logo.svg" alt="CodeBrief" width={40} height={40} />
            </DialogTitle>
          </DialogHeader>
          <h1>{loading ? "Answer ...." : answer}</h1>

        

          <h1>Files </h1>
          {filesReferences.map((files) => {
            return <span key={files.fileName}> {files.fileName} </span>;
          })}
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
            <Button type="submit">Ask CodeBrief</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
