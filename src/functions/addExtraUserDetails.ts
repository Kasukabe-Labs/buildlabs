import { ExtraUserDetailsProps } from "@/types/profile";
import { redirect, RedirectType } from "next/navigation";
import { toast } from "sonner";

const handleSubmit = async ({
  e,
  github,
  twitter,
  setOpen,
  setLoading,
}: ExtraUserDetailsProps) => {
  e.preventDefault();

  try {
    setLoading(true);

    if (!twitter || !github) {
      toast.error("Please fill in all fields");
      return;
    }
    const res = await fetch("/api/profile/addDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        twitter: twitter,
        github: github,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400) {
        toast.error(data.error);
        return;
      }
      toast.error(data.error || "Failed to update");
      return;
    }

    toast.success("Details added successfully!");
    setOpen(false);
    redirect("/", RedirectType.push);
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export { handleSubmit };
