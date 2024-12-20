import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // Ensure you have lucide-react installed
import { ILoginForm } from "@/interfaces/login";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/AuthService";
import { useNavigate } from "react-router-dom";
import conf from "@/conf/conf";
import { useToast } from "@/hooks/use-toast";

function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(data);
            if (data.data.data.token) {
                localStorage.setItem(conf.token, data.data.data.token);
                console.log(localStorage.getItem(conf.token));
                navigate("/");
                toast.toast({
                    variant: "default",
                    title: "Login Successful",
                    description: "You have successfully logged in",
                })
            }
            else {

            }
        },
    })

    const onSubmit: SubmitHandler<ILoginForm> = (data) => {
        console.log(data);
        if (data) {
            mutation.mutate(data);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                {/* Email Field */}
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        maxLength={10}

                        {...register("username", {
                            required: { value: true, message: "Phone No is required" },
                            pattern: {
                                value: /^(?:\+91|91)?[6789]\d{9}$/,
                                message: "Please enter a valid phone number",
                            },
                        })}
                        aria-invalid={errors.username ? "true" : "false"}
                    />
                    {errors.username && typeof errors.username.message === "string" && (
                        <small className="text-red-500" role="alert">
                            {errors.username.message}
                        </small>
                    )}
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"} // Toggle type
                            placeholder="Enter your password"
                            {...register("password", {
                                required: { value: true, message: "Password is required" },
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                                    message:
                                        "Password must include at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character",
                                },
                            })}
                            className="pr-10" // Add padding for the button
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <small className="text-red-500">{errors.password.message}</small>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={mutation.isPending} className="w-full">
                {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                    Sign up
                </a>
            </div>
        </form>
    );
}

export default LoginForm;
