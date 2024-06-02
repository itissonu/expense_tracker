import Image from "next/image";
import { Button } from "@/components/ui/button"

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="outline" className="bg-black text-white">Button</Button>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline" className="bg-black text-white">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

    </main>
  );
}
