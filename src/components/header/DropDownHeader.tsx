"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropDownHeaderProps = {
    name?: string | undefined | null;
    email?: string | undefined | null;
};

import { logout } from "../../../actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const DropdownHeader: React.FC<DropDownHeaderProps> = ({
    name,
    email,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className=" flex justify-center items-center rounded-full overflow-hidden">
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            width={50}
                            height={50}
                        />
                        {/* <AvatarFallback>{name?.substring(0, 2)}</AvatarFallback> */}
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>{name}</DropdownMenuItem>
                    <DropdownMenuItem>{email}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={logout}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
