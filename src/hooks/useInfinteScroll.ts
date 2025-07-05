import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  image: string;
  github: string;
  twitter: string;
}

interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  progress: number;
  github: string;
  createdAt: string;
  user: User;
}

interface ProjectsResponse {
  projects: Project[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface UseInfiniteProjectsReturn {
  projects: Project[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  error: string | null;
}

export const useInfiniteProjects = (): UseInfiniteProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async (cursor?: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = cursor
        ? `/api/projects/all?cursor=${encodeURIComponent(cursor)}`
        : "/api/projects/all";

      const response = await axios.get<ProjectsResponse>(url);
      const {
        projects: newProjects,
        nextCursor: newCursor,
        hasMore: moreAvailable,
      } = response.data;

      if (cursor) {
        // Append new projects for infinite loading
        setProjects((prev) => [...prev, ...newProjects]);
      } else {
        // Replace projects for initial load
        setProjects(newProjects);
      }

      setNextCursor(newCursor);
      setHasMore(moreAvailable);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && nextCursor) {
      fetchProjects(nextCursor);
    }
  }, [fetchProjects, loading, hasMore, nextCursor]);

  return {
    projects,
    loading,
    hasMore,
    loadMore,
    error,
  };
};
