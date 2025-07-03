import { ArrowBigUp, VoteIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ProjectCardProps } from "@/types/project";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ProjectViewDialog from "./ProjectViewDialog";

export default function ProjectCard({
  projectTitle,
  projectDescription,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col items-start justify-start space-y-0 w-full">
      <p>{projectTitle}</p>
      <p className="text-muted-foreground truncate md:max-w-sm max-w-[150px]">
        {projectDescription}
      </p>
      <div className="flex items-center space-x-2 mt-3">
        <ProjectViewDialog
          githubLink=""
          pfpSrc=""
          projectDescription=""
          projectTitle=""
        />
        <Tooltip>
          <TooltipTrigger>
            <Button>
              <ArrowBigUp size={30} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Vote this project</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
