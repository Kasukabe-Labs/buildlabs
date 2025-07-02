interface ProjectCardProps {
  projectTitle: string;
  projectDescription: string;
}

interface ProjectViewDialogProps extends ProjectCardProps {
  githubLink: string;
  pfpSrc: string;
}

export type { ProjectCardProps, ProjectViewDialogProps };
