"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button"

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { useNewAccount } from "@/features/accounts/hooks/use.new.account";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <main >
      <Button onClick={onOpen}>Add An Account</Button>
    </main>
  );
}
