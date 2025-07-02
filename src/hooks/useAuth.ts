import { useSession } from "@/lib/authCLient";
import { User } from "better-auth";
import { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session?.user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [session]);

  return { user, isAuthenticated };
}

export { useAuth };
