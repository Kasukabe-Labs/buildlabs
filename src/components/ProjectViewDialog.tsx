import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ProjectViewDialogProps } from "@/types/project";

export default function ProjectViewDialog({
  projectTitle,
  githubLink,
  projectDescription,
}: ProjectViewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="p-2 px-4 bg-primary text-primary-foreground rounded-md cursor-pointer">
        View
      </DialogTrigger>
      <DialogContent className="bg-background border border-primary rounded-xl p-6 ">
        <h2 className="text-lg font-semibold text-foreground">
          {projectTitle}
        </h2>

        <div className="text-muted-foreground">{projectDescription}</div>

        <p className="text-muted-foreground">
          Github:{" "}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            {githubLink}
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
