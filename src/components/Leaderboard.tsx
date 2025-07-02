import {
  Table,
  TableBody,
  TableCaption,
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

const leaderboardData = [
  {
    badge: "🏅",
    name: "Alice Johnson",
    project: "AI-Powered Todo App",
    progress: "80%",
    profileLink: "/users/alice",
  },
  {
    badge: "🎖️",
    name: "Bob Smith",
    project: "Realtime Chat App",
    progress: "60%",
    profileLink: "/users/bob",
  },
  {
    badge: "🏆",
    name: "Charlie Brown",
    project: "Crypto Tracker",
    progress: "100%",
    profileLink: "/users/charlie",
  },
  {
    badge: "🥇",
    name: "Dana White",
    project: "Fitness Planner",
    progress: "45%",
    profileLink: "/users/dana",
  },
];

export function Leaderboard() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 mt-12 bg-background text-foreground">
      <Table className="min-h-screen p-6 border border-border shadow rounded-lg max-w-6xl w-full bg-card text-card-foreground mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl px-6 tracking-normal ">
              Name
            </TableHead>
            <TableHead className="text-xl tracking-normal">Project</TableHead>
            <TableHead className="text-xl tracking-normal ">Progress</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leaderboardData.map((entry, idx) => (
            <TableRow key={idx} className="hover:bg-muted transition-colors">
              <TableCell className="px-6">
                <ProfileCard
                  avatarImg="https://github.com/shadcn.png"
                  username="subhraneel"
                  twitter="subhraneeltwt"
                  github="github.com/subhraneel2005"
                />
              </TableCell>

              <TableCell>
                <ProjectCard
                  projectTitle="Realtime excalidraw"
                  projectDescription="Realtime excalidraw clone using monorepo architecture with nextjs, prisma, tailwindcss, nodejs, websockets"
                />
              </TableCell>
              <TableCell className="">
                <Progress value={parseInt(entry.progress)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow className="h-20 text-center">
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground text-base"
            >
              Keep climbing the leaderboard!
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
