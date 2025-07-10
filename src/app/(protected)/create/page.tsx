"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const refetch = useRefetch();

  const createProject = api.project.createProject.useMutation();

  function onSubmit(data: FormInput) {
    createProject.mutate(
      {
        name: data.projectName,
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          refetch();
          reset();
        },

        onError: () => {
          toast.error("Failed to create project");
        },
      },
    );
    return true;
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/create.svg" alt="create" className="h-120 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            {" "}
            Link your Github Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your repository to link it to CodeBrief{" "}
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              required
            />
            <Input
              {...register("repoUrl", { required: true })}
              placeholder="Github Repo Link"
              type="url"
              required
            />
            <Input
              {...register("githubToken")}
              placeholder="Github Auth Token (optional)"
            />

            <Button type="submit" disabled={createProject.isPending}>
              {" "}
              Create Project{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
