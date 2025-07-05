import { ArrowBigUp, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ProjectViewDialogProps } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import ProjectViewDialog from "./ProjectViewDialog";
import { voteProjectHandler } from "@/functions/voteProjectHandler";

export default function ProjectCard({
  projectTitle,
  projectDescription,
  githubLink,
  votes,
  id,
}: ProjectViewDialogProps) {
  const [allVotes, setAllVotes] = useState(votes);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-start justify-start space-y-0 w-full">
      <div className="flex w-full gap-3 ">
        <p>{projectTitle}</p>
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          {allVotes} {allVotes <= 1 ? "Vote" : "Votes"}
        </Badge>
      </div>
      <p className="text-muted-foreground truncate md:max-w-sm max-w-[150px]">
        {projectDescription}
      </p>
      <div className="flex items-center space-x-2 mt-3">
        <ProjectViewDialog
          id={id}
          votes={votes}
          projectTitle={projectTitle}
          githubLink={githubLink}
          projectDescription={projectDescription}
        />
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() =>
                voteProjectHandler({
                  projectId: id,
                  setLoading,
                  setVotes: setAllVotes,
                })
              }
              disabled={loading}
              className="p-2"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={30} />
              ) : (
                <ArrowBigUp size={30} />
              )}
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
