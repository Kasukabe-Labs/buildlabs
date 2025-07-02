import { signIn } from "@/lib/authCLient";

async function XLogIn({
  setLoading,
}: {
  setLoading: (value: boolean) => void;
}) {
  await signIn.social(
    {
      provider: "twitter",
      callbackURL: "/profile/add",
    },
    {
      onRequest(context) {
        setLoading(true);
      },
      onResponse(context) {
        setLoading(false);
      },
    }
  );
}

export { XLogIn };
