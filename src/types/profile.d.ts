interface ProfileCardProps {
  avatarImg: string;
  username: string;
  twitter: string;
  github: string;
}

interface ExtraUserDetailsProps {
  twitter: string;
  github: string;
  e: React.FormEvent;
  setOpen: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export { ProfileCardProps, ExtraUserDetailsProps };
