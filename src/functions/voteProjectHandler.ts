import axios from "axios";
import { toast } from "sonner";

interface VoteProps {
  projectId: string;
  setVotes: (votes: number | ((prevVotes: number) => number)) => void;
  setLoading: (loading: boolean) => void;
}

const voteProjectHandler = async ({
  projectId,
  setLoading,
  setVotes,
}: VoteProps) => {
  try {
    if (!projectId) {
      toast.error("Project ID is required to vote.");
      return;
    }

    setLoading(true);

    const res = await axios.post("/api/vote", {
      projectId,
    });

    if (res.data.error) {
      toast.error(res.data.error);
      return;
    }

    if (!res.data || !res.data.message) {
      toast.error("Failed to vote. Please try again.");
      return;
    }

    toast.success(res.data.message);
    setVotes((prevVotes: number) => prevVotes + 1);
    setLoading(false);
  } catch (error: any) {
    console.log("Error voting for project:", error);
    const errorMessage =
      error?.data?.error || "You have already voted for this project";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

export { voteProjectHandler };
