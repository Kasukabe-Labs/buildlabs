"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [github, setGithub] = useState("");
  const [isSecretProject, setIsSecretProject] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateProject = async () => {
    setLoading(true);
    try {
      if (!projectName || !projectDescription || progress === 0 || !github) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }
      const response = await axios.post("/api/projects/new", {
        projectName,
        projectDescription,
        progress,
        github,
        isSecretProject,
      });

      if (response.status === 201) {
        toast.success("Project created successfully!");
        setProjectName("");
        setProjectDescription("");
        setProgress(0);
        setGithub("");
        setIsSecretProject(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex pt-16 flex-col justify-center items-center px-4 bg-background text-foreground">
      <h2 className="text-3xl font-bold mb-4">Create new project</h2>

      <Card className="w-full max-w-xl p-6 space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2 ">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description</Label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e: any) => setProjectDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Project progress</Label>
            <Select onValueChange={(value) => setProgress(Number(value) * 20)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">⏳ Just Started</SelectItem>
                  <SelectItem value="2">🛠️ In Progress</SelectItem>
                  <SelectItem value="3">🔄 Halfway There</SelectItem>
                  <SelectItem value="4">🚀 Almost Done</SelectItem>
                  <SelectItem value="5">✅ Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isSecretProject">Secret Project</Label>
            <Switch
              id="isSecretProject"
              checked={isSecretProject}
              onCheckedChange={setIsSecretProject}
            />
          </div>

          <Button
            disabled={loading}
            onClick={handleCreateProject}
            className="mt-4 w-full"
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
