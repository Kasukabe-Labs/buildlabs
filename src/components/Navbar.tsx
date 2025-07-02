"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { XLogIn } from "@/functions/login";
import { useSession } from "@/lib/authCLient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="w-full py-3 max-w-6xl px-4 mt-4 flex justify-between items-center border border-muted  mx-auto">
      <div className="flex justify-center items-center gap-2">
        <Image
          src={"/assets/badges/badge05.png"}
          alt="badge"
          width={40}
          height={40}
        />
        <h3 className="text-2xl">Buildlabs</h3>
      </div>

      {isAuthenticated ? (
        <Avatar className="size-12 rounded-xl">
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
      ) : (
        <Button disabled={loading} onClick={() => XLogIn({ setLoading })}>
          Enter Arena
        </Button>
      )}
    </div>
  );
}
