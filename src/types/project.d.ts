interface ProjectCardProps {
  projectTitle: string;
  projectDescription: string;
}

interface ProjectViewDialogProps extends ProjectCardProps {
  githubLink: string;
}

export type { ProjectCardProps, ProjectViewDialogProps };
