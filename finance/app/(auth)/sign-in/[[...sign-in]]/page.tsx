import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import img from '../../../../public/image_processing20200228-15427-18eqval.png'

import Image from "next/image";
import { Loader } from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-screen w-full flex justify-center items-center p-6">

            <div className="h-full  w-full flex-col flex  items-center space-y-4 p-6">
                <h3 className="font-bold  lg:text-[20px]   ">Welcome Back User </h3>
                <ClerkLoaded>
                    <div><SignIn path="/sign-in" /></div>
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader className="animate-spin" />
                </ClerkLoading>

            </div>
            <div className="bg-gray-100 h-full w-full lg:flex hidden">
                <Image alt="sign-in" src={img} />
            </div>

        </div>
    );
}