"use client";

import { Button } from "@/components/ui/button";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";

export default function Home() {
  const { getToken } = useAuth();
  const fetchProtection = async () => {
    const token = await getToken();
    console.log("------------TOKEN-----------", token);
    fetch("http://localhost:8000/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const fetchProfile = async () => {
    const token = await getToken();

    console.log("------------PROFILE-----------", token);
    fetch("http://localhost:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div className="fullScreen">
      <Button onClick={fetchProtection}>Fetch Protected</Button>
      <Button onClick={fetchProfile}>Fetch Profile</Button>
    </div>
  );
}
