"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

import ClipLoader from "react-spinners/ClipLoader";

import { useSearchParams } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { RegisterSchema } from "@/validation/register_validation";
import FormError from "@/components/form_error";
import FormSuccess from "@/components/form_success";
import { useState, useTransition } from "react";
import { register } from "../../../../actions/register";

const SignUp = () => {
    
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const urlError =
        searchParams.get("error") === "OAuthAccountNotLinked"
            ? "Email already in use with other provider in this site"
            : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    //Initial Form Value
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center lg:w-2/6 md:w-3/6 sm:w-2/3 w-full select-none h-fit"
        >
            <Card className=" w-full">
                <div className=" grow p-4 flex flex-col items-center">
                    <h2 className="md:text-3xl font-semibold tracking-tight first:mt-0 text-2xl">
                        Create an Account
                    </h2>
                    <p className=" leading-4 [&:not(:first-child)]:mt-4 text-gray-400">
                        Enter your email below to create account
                    </p>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" w-full"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => {
                                    return (
                                        <FormItem className=" mt-4 w-full">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    autoComplete="false"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display
                                                name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem className=" mt-3 w-full">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    autoComplete="false"
                                                    type="text"
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
                                        <FormItem className=" mt-3 mb-4 w-full">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    autoComplete="false"
                                                    type="password"
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
                                    "Create an account"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className=" flex my-4">
                        <p className=" leading-4  text-gray-400 text-sm">
                            Already have an account?
                        </p>
                        <Link href="/auth/login">
                            <p className=" leading-4 text-black ml-2 hover:underline text-sm">
                                Sign In
                            </p>
                        </Link>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default SignUp;
