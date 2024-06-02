import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import img from '../../../../public/image_processing20200228-15427-18eqval.png'

import Image from "next/image";
import { Loader } from "lucide-react";
export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6">

      <div className="h-full  w-full lg:w-[50%] flex flex-col items-center   space-y-4 p-6">
        <h3 className="font-bold flex lg:text-[20px]   ">Welcome to our Website.</h3>
        <ClerkLoaded>
          <div>
            <SignUp path="/sign-up" />
          </div>
        </ClerkLoaded>
        <ClerkLoading>
          <Loader className="animate-spin" />
        </ClerkLoading>

      </div>
      <div className="bg-gray-100 lg:w-[50%] h-full w-full">
        <Image alt="sign-up" className="h-full w-full hidden lg:flex" src={img} />
      </div>

    </div>
  )
}