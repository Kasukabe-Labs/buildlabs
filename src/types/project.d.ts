interface ProjectCardProps {
  projectTitle: string;
  projectDescription: string;
}

interface ProjectViewDialogProps extends ProjectCardProps {
  id: string;
  githubLink: string;
  votes: number;
}

export type { ProjectCardProps, ProjectViewDialogProps };
