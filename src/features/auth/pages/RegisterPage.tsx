import {Button} from "@components/ui/button.tsx";
import {FaFacebook, FaFacebookF, FaGoogle, FaWhatsapp} from "react-icons/fa";
import {ExtendedInput} from "@components/extensions/input.tsx";
import {useForm} from "react-hook-form";
import {FormField} from "@components/forms/FormField.tsx";
import {ArrowRight} from "lucide-react";
import {FaSquareFacebook} from "react-icons/fa6";


const RegisterPage = () => {


    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm();


    const onSubmit = async (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col w-full max-w-lg">
            {/* Centered Form */}

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
                        className="group flex w-full cursor-pointer items-center gap-4 rounded-md border   p-4 text-left transition-all border-primary bg-primary/10 hover:shadow-md"
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
                    <div className="h-px flex-1 bg-border"></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>

                        <FormField label={"Email Address"} required={true} error={errors.email}>
                            <ExtendedInput
                                type="email"
                                placeholder="name@company.com"
                                className="h-12"

                                {...register("email", {
                                    required: "Email Address is required",
                                })}

                            />
                        </FormField>

                        <p className="text-muted-foreground text-xs mt-1">
                            We’ll send a verification code to your email.
                        </p>
                    </div>

                    {/* Password */}


                    <Button size={"lg"} className="w-full h-12" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send verification code"}
                    </Button>
                </form>
            </div>


            {/* Bottom Link */}
            <div className="text-center text-sm text-muted-foreground py-5">
                <p>
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="!text-primary font-bold hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;