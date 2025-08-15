"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function AddNewProject() {
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [fundTarget, setFundTarget] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const token = await getToken();
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8000/api/v1/project",
        {
          title,
          description,
          github,
          fund_target: parseInt(fundTarget),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Add new project errror ------------ " + error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="fullScreen">
      <h1>Add New Project</h1>
      <Input
        placeholder="Project Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Github Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <Input
        placeholder="Fund Target"
        value={fundTarget}
        onChange={(e) => setFundTarget(e.target.value)}
      />

      <Button disabled={loading} onClick={handleSubmit}>
        {loading ? "Adding..." : "Add Project"}
      </Button>
    </div>
  );
}
