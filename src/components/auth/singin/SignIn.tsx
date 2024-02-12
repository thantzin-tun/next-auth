"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

import { motion } from "framer-motion";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useTransition } from "react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { LoginSchema } from "@/validation/login_validation";
import Image from "next/image";
import Images from "@/assets";
import { signIn } from "next-auth/react";
import FormError from "@/components/form_error";
import FormSuccess from "@/components/form_success";
import { login } from "../../../../actions/login";
import ClipLoader from "react-spinners/ClipLoader";

const SignIn = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    //Initial Form Value
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    //Server Actions
    function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).then((data: any) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center lg:w-2/5 md:w-3/6 w-full select-none h-fit"
        >
            <Card className="w-full">
                <div className=" grow p-4 flex flex-col items-center">
                    <h2 className="text-3xl font-semibold tracking-tight first:mt-0">
                        Sign In
                    </h2>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" w-full"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem className=" mt-2 w-full">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => {
                                    return (
                                        <FormItem className=" mt-2 mb-6 w-full">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    autoComplete="false"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            ></FormField>
                            <Button
                                className=" w-full"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <ClipLoader
                                        color="white"
                                        loading={true}
                                        size={25}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className=" my-4 w-full flex justify-center py-1">
                        <p className=" leading-4 text-sm [&:not(:first-child)]:mt-4 text-gray-400">
                            Or connected with
                        </p>
                    </div>

                    <div className="flex {{ lg:flex-row }} flex-col w-full items-center justify-between md:gap-x-3 gap-y-3 ">
                        <Button
                            className=" hover:bg-blue-800 w-full hover:text-white"
                            variant="outline"
                            onClick={() => signIn("google")}
                        >
                            <Image
                                alt="google_logo"
                                src={Images.goolge}
                                width={20}
                                height={20}
                                className=" mr-2"
                            />{" "}
                            Continue with Google
                        </Button>
                        <Button
                            className=" hover:bg-blue-800 w-full hover:text-white"
                            variant="outline"
                            onClick={() => signIn("google")}
                        >
                            <Image
                                alt="google_logo"
                                src={Images.goolge}
                                width={20}
                                height={20}
                                className=" mr-2"
                            />{" "}
                            Continue with Facebook
                        </Button>
                    </div>

                    <div className=" flex my-4">
                        <p className=" leading-4  text-gray-400 text-sm">
                            Don't have an account?
                        </p>
                        <Link href="/auth/register">
                            <p className=" leading-4 text-black ml-2 hover:underline text-sm">
                                Sign Up
                            </p>
                        </Link>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default SignIn;
