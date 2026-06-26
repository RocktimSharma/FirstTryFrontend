import {Button} from "@components/ui/button.tsx";
import {useEffect, useState} from "react";

import {FaFacebookF, FaGoogle, FaWhatsapp} from "react-icons/fa";
import {useSignIn} from "@clerk/clerk-react";
import {toast} from "sonner";
import OtpInput from "@components/auth/OtpInput.tsx";
import {ArrowRight} from "lucide-react";
import {MdEmail} from "react-icons/md";
import { MdMarkEmailRead, MdLockOutline } from "react-icons/md";

const LoginPage = () => {

    const {signIn, isLoaded, setActive} = useSignIn();

    // step 1 → email
    // step 2 → OTP
    const [step, setStep] = useState<1 | 2>(1);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [otpArray, setOtpArray] = useState(Array(6).fill(""));
    const otp = otpArray.join("");

    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [sessionId, setSessionId] = useState<string | null>(null);
    const [timer, setTimer] = useState(30);

    const validateEmail = (value: string) => {
        if (!value.trim()) return "Email is required.";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address.";
        return "";
    };


    // Send Email OTP

    const sendEmailOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        const validationError = validateEmail(email);
        if (validationError) {
            setEmailError(validationError);
            return;
        }

        if (!isLoaded) return;

        setLoading(true);

        try {
            const res = await signIn.create({
                identifier: email,
                strategy: "email_code",
            });

            setSessionId(res?.id || null);
            setStep(2);
            setTimer(30);

            toast.success("Verification code sent to your email.", {
                description: "Please check your inbox.",
            });
        } catch (err: any) {
            const message =
                err?.errors?.[0]?.message || err?.message || "Something went wrong.";

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };


    // Verify OTP

    const onVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded || !signIn || !sessionId) return;

        setIsSubmitting(true);

        try {
            const attempt = await signIn.attemptFirstFactor({
                code: otp,
                strategy: "email_code",
            });

            if (attempt?.status === "complete") {
                await setActive({session: attempt.createdSessionId});
                toast.success("Logged in successfully!");
                window.location.href = "/";
            }
        } catch (err: any) {
            const message =
                err?.errors?.[0]?.message ||
                err?.message ||
                "Invalid code. Please try again.";

            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    // Resend OTP
    const handleResend = async () => {
        if (!isLoaded || !email || loading) return;
        await sendEmailOtp(); // same function
    };

    // timer countdown
    useEffect(() => {
        if (step !== 2 || timer === 0) return;

        const interval = setInterval(() => setTimer((t) => t - 1), 1000);

        return () => clearInterval(interval);
    }, [step, timer]);

    // Greeting text
    const [greeting, setGreeting] = useState("Hello");
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 17) setGreeting("Good Day");
        else setGreeting("Good Evening");
    }, []);

    // Social login helper
    const signInWith = (provider: "oauth_google" | "oauth_apple") => {
        if (!isLoaded) return;
        signIn.authenticateWithRedirect({
            strategy: provider,
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/",
        });
    };


    return (
        <div className="flex flex-col w-full max-w-lg">

            {step === 1 && (
                <>
                    <div className={'space-y-5'}>
                        <div>
                            <h1 className="font-bold !text-4xl">
                                Welcome!
                            </h1>

                            <p className="text-muted-foreground">
                                Create your account to get started.
                            </p>
                        </div>

                        <div className={'w-full space-y-2'}>

                            <button
                                className="group flex w-full cursor-pointer items-center gap-4 rounded-md border  bg-transparent p-4 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
                            >
                                <div className="flex shrink-0">
                                    <FaGoogle size={24}/>
                                </div>
                                <div className="min-w-0 flex-1">Continue with Google</div>
                                <ArrowRight
                                    size={24}
                                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                /></button>
                            <button
                                className="group flex w-full cursor-pointer items-center gap-4 rounded-md border  bg-transparent p-4 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
                            >
                                <div className="flex shrink-0">
                                    <FaFacebookF size={24}/>
                                </div>
                                <div className="min-w-0 flex-1">Continue with Facebook</div>
                                <ArrowRight
                                    size={24}
                                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                /></button>
                            <button
                                className="group flex w-full cursor-pointer items-center gap-4 rounded-md border  bg-transparent p-4 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md"
                            >
                                <div className="flex shrink-0">
                                    <FaWhatsapp size={24}/>
                                </div>
                                <div className="min-w-0 flex-1">Continue with Whatsapp</div>
                                <ArrowRight
                                    size={24}
                                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                /></button>


                        </div>


                        <div
                            className="w-full text-sm font-light shrink-0 flex items-center text-muted-foreground gap-x-2 my-3">
                            <div className="h-px flex-1 bg-border"></div>
                            or continue with
                            <div className="h-px flex-1 bg-border">


                            </div>

                        </div>
                        <div className={'w-full space-y-2'}>

                            <button className="group flex w-full cursor-pointer items-center gap-4 rounded-md border bg-transparent p-4 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md">
                                <div className="flex shrink-0 rounded-sm bg-muted p-2">
                                    <MdMarkEmailRead size={24} />
                                </div>

                                <div className="min-w-0 flex-1 flex flex-col gap-px">
                                    <p className="mb-0 leading-tight font-medium">Sign in with Email OTP</p>
                                    <small className="text-muted-foreground leading-tight">
                                        We'll send a one-time code to your email.
                                    </small>
                                </div>

                                <ArrowRight
                                    size={24}
                                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                />
                            </button>


                            <button className="group flex w-full cursor-pointer items-center gap-4 rounded-md border bg-transparent p-4 text-left transition-all hover:border-primary hover:bg-primary/10 hover:shadow-md">
                                <div className="flex shrink-0 rounded-sm bg-muted p-2">
                                    <MdLockOutline size={24} />
                                </div>

                                <div className="min-w-0 flex-1 flex flex-col gap-px">
                                    <p className="mb-0 leading-tight font-medium">Sign in with Password</p>
                                    <small className="text-muted-foreground leading-tight">
                                        Sign in using your email and password.
                                    </small>
                                </div>

                                <ArrowRight
                                    size={24}
                                    className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                />
                            </button>

                        </div>
                    </div>


                    <div className="text-center text-sm text-muted-foreground py-5">
                        <p>
                            Don't have an account?{" "}
                            <a
                                href="/signup"
                                className="!text-primary font-bold hover:underline"
                            >
                                Sign Up
                            </a>
                        </p>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div className="flex-grow flex items-center justify-center">
                        <div>
                            <h1 className="font-bold !text-4xl mb-5">
                                Verify your<br/> Account
                            </h1>

                            {/* OAuth Buttons */}


                            <p className="block mb-2 text-secondary text-xs">
                                Enter the 6-digit verification code send to your email
                            </p>

                            <form onSubmit={onVerifyOtp} className="space-y-4">
                                {/* Email */}
                                {/* 6-digit OTP input */}
                                <OtpInput value={otpArray} onChange={setOtpArray}/>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive the code?"}
                                    </span>

                                    <button
                                        type="button"
                                        className="text-primary hover:underline disabled:opacity-40"
                                        disabled={timer > 0 || loading}
                                        onClick={handleResend}
                                    >
                                        {loading ? "Resending..." : "Resend"}
                                    </button>
                                </div>
                                {/* Password */}


                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? "Verifying..." : "Verify Account"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </>
            )

            }
        </div>


    );
};

export default LoginPage;
