"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [github, setGithub] = useState("");
  const [isSecretProject, setIsSecretProject] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center px-4 bg-background text-foreground">
      <h2 className="text-3xl font-bold mb-4">Create new project</h2>

      <Card className="w-full max-w-md p-6 space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
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
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
            />
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
        </CardContent>
      </Card>
    </div>
  );
}
