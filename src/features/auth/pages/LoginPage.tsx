import {Button} from "@components/ui/button.tsx";
import {useEffect, useState} from "react";

import {FaApple} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {useSignIn} from "@clerk/clerk-react";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {Label} from "@components/ui/label.tsx";
import {toast} from "sonner";
import OtpInput from "@components/auth/OtpInput.tsx";

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
        <div className="flex flex-col px-4">

            {step === 1 && (
                <>
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


                            <form onSubmit={sendEmailOtp} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <Label className={`mb-1`}>Email Address</Label>
                                    <ExtendedInput
                                        type="email"
                                        placeholder="name@company.com"
                                        className={`h-10`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {emailError}
                                        </p>
                                    )}
                                    <p className="text-muted-foreground text-xs mt-1">
                                        We’ll send a verification code to your email.
                                    </p>
                                </div>

                                {/* Password */}


                                <Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? "Sending..." : "Send verification code"}
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
