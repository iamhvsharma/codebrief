import { api } from "@/trpc/react";
import type { Project } from "@prisma/client";

import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();
  const [projectId, setprojectId] = useLocalStorage("codebrief-projectId", "");

  const project = projects?.find((project) => project.id === projectId);

  return {
    projects,
    project,
    projectId,
    setprojectId,
  };
};

export default useProject;
