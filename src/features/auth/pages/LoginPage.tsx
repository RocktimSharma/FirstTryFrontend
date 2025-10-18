import {useForm} from "react-hook-form";
import {Input} from "@components/ui/input.tsx";
import {Button} from "@components/ui/button.tsx";
import {useEffect, useState} from "react";

import {FaApple} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useSignIn} from "@clerk/clerk-react";

import type { LoginFormInputs } from "@/types/auth";




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
        } else if (hour >= 17 && hour < 21) {
            setGreeting("Good Evening");
        } else {
            setGreeting("Good Night");
        }
    }, []);


    const onSubmit = async (data: LoginFormInputs) => {
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: data.email,
                password: data.password,
            });

            if (result.status === "complete") {
                await setActive({session: result.createdSessionId});
                console.log("Signed in successfully ✅");
            } else {
                console.log("Additional steps required:", result);
            }
        } catch (err: any) {
            console.error("Login error:", err.errors);
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
                <div className="">
                    <h1 className="text-2xl font-bold">
                        {greeting} <br/> Welcome Back!
                    </h1>
                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-2 my-7">
                        <Button
                            type="button"
                            onClick={() => signInWith("oauth_google")}
                            className="border bg-background hover:bg-white text-secondary-foreground font-normal"
                        >
                            <FcGoogle size={20}/> Sign in with Google
                        </Button>
                        <Button
                            type="button"
                            onClick={() => signInWith("oauth_apple")}
                            className="border bg-background hover:bg-white text-secondary-foreground font-normal"
                        >
                            <FaApple className={`text-black`} size={20}/> Sign in with Apple
                        </Button>
                    </div>
                    <p className="block mb-2">
                        or sign in with your email
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"

                                {...register("email", {required: "Email is required"})}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                {...register("password", {required: "Password is required"})}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Signing in..." : "Sign In"}
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
