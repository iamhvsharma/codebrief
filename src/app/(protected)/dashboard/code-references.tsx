"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type Props = {
  filesReferences: {
    fileName: string;
    sourceCode: string;
    summary: string;
  }[];
};

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = useState(filesReferences[0]?.fileName);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (filesReferences.length === 0) return null;

  const handleCopy = async (sourceCode: string, fileName: string) => {
    await navigator.clipboard.writeText(sourceCode);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="max-w-[70vw]">
      <Tabs value={tab} onValueChange={(value) => setTab(value)}>
        <div className="flex gap-2 overflow-x-auto rounded-md bg-muted p-2">
          {filesReferences.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              className={cn(
                "text-muted-foreground rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer",
                {
                  "bg-primary text-primary-foreground": tab === file.fileName,
                }
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>

        {filesReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="relative mt-4 max-h-[40vh] max-w-7xl overflow-auto rounded-md border border-border bg-muted p-2"
          >
            {/* Copy Button */}
            <div className="absolute top-5 right-3 z-10">
              <Button
                size="sm"
                variant="outline"
                className="bg-muted cursor-zoom-pointer" 
                onClick={() => handleCopy(file.sourceCode, file.fileName)}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copiedFile === file.fileName ? "Copied!" : "Copy"}
              </Button>
            </div>

            <SyntaxHighlighter
              language="typescript"
              style={lucario}
              customStyle={{ paddingTop: "2rem" }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;
