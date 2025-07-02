"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleSubmit } from "@/functions/addExtraUserDetails";
import { useState } from "react";

export default function page() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add details soldier</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="twitter">Twitter username</Label>
            <Input
              id="twitter"
              name="twitter"
              placeholder="subhraneeltwt"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="github">Github username</Label>
            <Input
              id="github"
              name="github"
              placeholder="subhraneel2005"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={(e) =>
              handleSubmit({ e, github, twitter, setOpen, setLoading })
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
