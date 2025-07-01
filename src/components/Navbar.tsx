"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { XLogIn } from "@/functions/login";
import { useSession } from "@/lib/authCLient";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Navbar() {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="w-full py-2 px-6 flex justify-between items-center border border-muted">
      <Image
        src={"/assets/badges/badge05.png"}
        alt="badge"
        width={60}
        height={60}
      />

      {session ? (
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
