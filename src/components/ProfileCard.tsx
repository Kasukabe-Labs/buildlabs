import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ProfileCardProps } from "@/types/profile";
import { Github, Twitter } from "lucide-react";

export default function ProfileCard({
  avatarImg,
  username,
  twitter,
  github,
}: ProfileCardProps) {
  return (
    <div className="flex gap-4 justify-start w-full items-start">
      <Avatar className="size-12 rounded-xl cursor-pointer hover:scale-105 duration-300">
        <AvatarImage src={avatarImg!} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col justify-start items-start space-y-2">
        <p className="text-sm text-muted-foreground cursor-pointer flex justify-center items-center gap-1">
          {" "}
          <Twitter size={20} />
          {twitter}
        </p>
        <p className="text-sm text-muted-foreground cursor-pointer flex justify-center items-center gap-1">
          <Github size={20} />
          {github}
        </p>
      </div>
    </div>
  );
}
