import {Button} from "@components/ui/button.tsx";

import {ExtendedInput} from "@components/extensions/input.tsx";
import {useForm} from "react-hook-form";
import {FormField} from "@components/forms/FormField.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {setPasswordSchema} from "@features/auth/schema/set-password.ts";

const SetPasswordPage = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(setPasswordSchema),
    });


    const onSubmit = async (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col w-full max-w-lg">
            <div className="space-y-5">
                <div>
                    <h1 className="font-bold !text-4xl">
                        Set your password
                    </h1>

                    <p className="text-muted-foreground">
                        Create a strong password to secure your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* Password */}
                    <div>
                        <FormField
                            label="Password"
                            required
                            error={errors.password}
                        >
                            <div
                                className="flex rounded-sm border border-border focus-within:border-accent overflow-hidden">
                                <ExtendedInput
                                    type={showPassword ? "text" : "password"}
                                    className="h-12 rounded-none border-0 focus-visible:ring-0"
                                    {...register("password", {
                                        required: "Password is required.",
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="h-12 px-4 bg-input/30  border-0 text-muted-foreground  transition-colors  hover:text-foreground"

                                >
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
                        </FormField>


                    </div>

                    {/* Confirm Password */}
                    <FormField
                        label="Confirm Password"
                        required
                        error={errors.confirmPassword}
                    >
                        <div
                            className="flex rounded-sm border border-border focus-within:border-accent overflow-hidden">
                            <ExtendedInput
                                type={showConfirmPassword ? "text" : "password"}
                                className="h-12 rounded-none border-0 focus-visible:ring-0"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password.",
                                })}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="h-12 px-4 bg-input/30  border-0 text-muted-foreground  transition-colors  hover:text-foreground"
                            >
                                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>

                    </FormField>
                    <p className="text-muted-foreground text-xs mt-1">
                        Use at least 8 characters with uppercase, lowercase, a number, and a special character.
                    </p>

                    <Button
                        size="lg"
                        className="w-full h-12"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Set Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SetPasswordPage;