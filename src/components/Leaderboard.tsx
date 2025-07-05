"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Progress } from "./ui/progress";
import ProfileCard from "./ProfileCard";
import ProjectCard from "./ProjectCard";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { useInfiniteProjects } from "@/hooks/useInfinteScroll";

export function Leaderboard() {
  const { projects, loading, hasMore, loadMore, error } = useInfiniteProjects();
  const observerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  if (error) {
    return (
      <div className="min-h-screen w-full pt-26 flex flex-col justify-center items-center px-4 mt-6 bg-background text-foreground">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 mt-6 bg-background text-foreground">
      <div className="w-full max-w-6xl flex justify-start gap-6 items-center mb-2">
        <Link href={"/newProject"}>
          <Button variant={"secondary"}>Create project</Button>
        </Link>
        <Button variant={"secondary"}>View profile</Button>
      </div>

      <Table className="min-h-screen p-6 border border-border shadow rounded-lg max-w-6xl w-full bg-card text-card-foreground mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl px-6 tracking-normal">Name</TableHead>
            <TableHead className="text-xl tracking-normal">Project</TableHead>
            <TableHead className="text-xl tracking-normal">Progress</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((project, idx) => (
            <TableRow
              key={project.id}
              className="hover:bg-muted transition-colors"
            >
              <TableCell className="px-6">
                <ProfileCard
                  avatarImg={
                    project.user.image || "https://github.com/shadcn.png"
                  }
                  username={project.user.name}
                  twitter={project.user.twitter}
                  github={project.user.github}
                />
              </TableCell>

              <TableCell>
                <ProjectCard
                  id={project.id}
                  votes={project.votes}
                  githubLink={project.github}
                  projectTitle={project.projectName}
                  projectDescription={project.projectDescription}
                />
              </TableCell>

              <TableCell>
                <Progress value={project.progress} />
              </TableCell>
            </TableRow>
          ))}

          {/* Loading rows */}
          {loading && (
            <>
              {[...Array(3)].map((_, idx) => (
                <TableRow key={`loading-${idx}`} className="animate-pulse">
                  <TableCell className="px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-32"></div>
                      <div className="h-3 bg-muted rounded w-48"></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>

        <TableFooter>
          <TableRow className="h-20 text-center">
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground text-base"
            >
              {projects.length === 0 && !loading
                ? "No projects found. Start building!"
                : !hasMore
                ? "You've reached the end! Keep climbing the leaderboard!"
                : "Keep climbing the leaderboard!"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Infinite scroll trigger */}
      <div ref={observerRef} className="h-10 w-full" />
    </div>
  );
}
