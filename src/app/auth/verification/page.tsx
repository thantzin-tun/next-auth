"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import Images from "@/assets";

import { ClipLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";

import FormSuccess from "@/components/form_success";
import FormError from "@/components/form_error";
import { verification } from "../../../../actions/verification";
import { Button } from "@/components/ui/button";

export default function Verification() {
    const token = useSearchParams().get("token");

    const [success, setSuccess] = React.useState<string | undefined>();
    const [error, setError] = React.useState<string | undefined>();

    const checkToken = React.useCallback(() => {
        if (!token) return;
        verification(token).then((data: any) => {
            setSuccess(data.success);
            setError(data.error);
        });
    }, [token]);

    React.useEffect(() => {
        checkToken();
    }, [checkToken]);

    return (
        <Card className="md:w-[400px] w-[250px]  text-center">
            <CardHeader className="flex justify-center items-center">
                <CardTitle>
                    <Image
                        src={Images.auth}
                        width={100}
                        height={100}
                        objectFit="cover"
                        alt="auth_logo"
                    />
                </CardTitle>
                <CardDescription>Confirming your verification</CardDescription>
            </CardHeader>
            <CardContent>
                {!success || !error ? (
                    <ClipLoader color="#000" loading={true} size={40} />
                ) : (
                    <>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                    </>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button disabled={true}>Back to sign in</Button>
            </CardFooter>
        </Card>
    );
}
