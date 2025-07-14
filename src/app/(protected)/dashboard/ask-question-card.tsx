"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import Image from "next/image";
import React, { useState } from "react";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Image src="/logo.svg" alt="CodeBrief" width={40} height={40} />
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle> Ask a question </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler}>
            <Textarea placeholder="Eg: Which file I should change to edit the homepage." />
            <div className="h-4"></div>
            <Button type="submit">Ask CodeBrief</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
