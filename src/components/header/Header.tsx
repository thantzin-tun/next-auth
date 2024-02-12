import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

import { auth } from "../../../auth";
import Images from "@/assets";
import Image from "next/image";
import { Card } from "../ui/card";
import { DropdownHeader } from "./DropDownHeader";

const Header = async () => {
    const session = await auth();
    return (
        <div className="w-full h-fit flex justify-center  fixed top-0 left-0 px-2 pt-4 select-none">
            <Card className=" w-4/5 h-full header_animation">
                <div className="flex justify-between  items-center md:px-28 px-10 py-2">
                    <Image
                        src={Images.connection}
                        alt="app-logo"
                        width={50}
                        height={50}
                    />
                    <div className="flex justify-center items-center">
                        <DropdownHeader
                            name={session?.user?.name}
                            email={session?.user?.email}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Header;
