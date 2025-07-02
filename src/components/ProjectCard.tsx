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
    <div className="flex flex-col items-start justify-start space-y-2 w-full">
      <p>{projectTitle}</p>
      <p className="text-muted-foreground truncate max-w-sm">
        {projectDescription}
      </p>
      <div className="flex items-center space-x-2">
        {/* <Button className="cursor-pointer text-sm">View</Button> */}
        <ProjectViewDialog
          githubLink=""
          pfpSrc=""
          projectDescription=""
          projectTitle=""
        />
        <Tooltip>
          <TooltipTrigger>
            <Button className="cursor-pointer">
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
