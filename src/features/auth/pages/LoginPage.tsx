import {useForm} from "react-hook-form";
import {Input} from "@components/ui/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {useEffect, useState} from "react";

import {FaApple} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useSignIn} from "@clerk/clerk-react";

import type { LoginFormInputs } from "@/types/auth";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Label} from "@components/ui/label.tsx";
import {toast} from "sonner";




const LoginPage = () => {
    const {signIn, isLoaded, setActive} = useSignIn();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormInputs>();

    const [greeting, setGreeting] = useState("Hello");

    useEffect(() => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 17) {
            setGreeting("Good Day");
        } else if (hour >= 17) {
            setGreeting("Good Evening");
        }
    }, []);


    const onSubmit = async (data: LoginFormInputs) => {

        if (!isLoaded && !signIn) return null

        try {
            await signIn.create({
                identifier: data.email,
                strategy: "email_code",
            })

            toast.success("Verification code sent to your email.", {
                description: "Please check your inbox for the login code.",
                action: {
                    label: "Undo",
                    onClick: () => {},
                },
            });

        } catch (err: any) {
            console.error(err);
            const message =
                err?.errors?.[0]?.message ||
                err?.message ||
                "Something went wrong.";

            toast.error(message, {

                action: {
                    label: "Retry",
                    onClick: () => onSubmit(data),   // retry automatically
                },
            });

        }
    };

    // Social login handler
    const signInWith = (provider: "oauth_google" | "oauth_apple") => {
        if (!isLoaded) return;
        signIn.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: "/sso-callback",   // your redirect route
            redirectUrlComplete: "/dashboard", // after login
        });
    };

    return (
        <div className="flex flex-col px-4">
            {/* Centered Form */}
            <div className="flex-grow flex items-center justify-center">
                <div>
                    <h1 className="font-bold !text-4xl">
                        {greeting} <br/> Welcome Back!
                    </h1>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-2 my-5">
                        <Button
                            type="button"
                            onClick={() => signInWith("oauth_google")}
                            className="shadow-none border bg-background border-background hover:border hover:bg-card text-secondary  font-normal"
                        >
                            <FcGoogle size={20}/> Sign in with Google
                        </Button>
                        <Button
                            type="button"
                            onClick={() => signInWith("oauth_apple")}
                            className=" shadow-none bg-background border border-background hover:border  hover:bg-card text-secondary font-normal"
                        >
                            <FaApple className={`text-black`} size={20}/> Sign in with Apple
                        </Button>
                    </div>
                    <div className="w-full shrink-0 flex items-center text-secondary  gap-x-2 mb-2">
                        <div className="h-px flex-1 bg-border"></div>
                        or
                        <div className="h-px flex-1 bg-border"></div>
                    </div>
                    {/*<p className="block mb-2 text-secondary text-sm">*/}
                    {/*    or continue with email*/}
                    {/*</p>*/}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <Label className={`mb-1`}>Email Address</Label>
                            <ExtendedInput
                                type="email"
                                placeholder="name@company.com"
                                className={`h-10`}
                                {...register("email", {required: "This email doesn’t look right."})}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                            <p className="text-muted-foreground text-xs mt-1">
                                We’ll send a verification code to your email.
                            </p>
                        </div>

                        {/* Password */}


                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Sending..." : "Send verification code"}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Bottom Link */}
            <div className="text-center py-4">
                <p>
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-foreground font-bold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>


    );
};

export default LoginPage;
