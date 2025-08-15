"use client";

import AddNewProject from "@/components/AddNewProject";
import { Button } from "@/components/ui/button";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import axios from "axios";

export default function Home() {
  const { getToken } = useAuth();
  const fetchProtection = async () => {
    const token = await getToken();
    console.log("------------TOKEN-----------", token);
    fetch("http://localhost:8000/api/v1/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchProfile = async () => {
    const token = await getToken();

    console.log("------------PROFILE-----------", token);
    fetch("http://localhost:8000/api/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/projects");
      console.log(res.data);
    } catch (error) {
      console.log("Error in fetch all projects" + error);
    }
  };
  return (
    <div className="fullScreen">
      <Button onClick={fetchProtection}>Fetch Protected</Button>
      <Button onClick={fetchProfile}>Fetch Profile</Button>
      <Button onClick={fetchAllProjects}>Fetch All Projects</Button>

      <AddNewProject />
    </div>
  );
}
