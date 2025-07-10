"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data));
    console.log(data.repoUrl);
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

            <Button type="submit"> Create Project </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
