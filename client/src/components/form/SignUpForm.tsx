'use client'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



const FormSchema = z.object({
    email: z.string().min(1,"Email is required").email("Email is invalid"),
    username: z.string().min(1,"Username is required"),
    password: z.string()
    .min(1,"Password is required").min(8,"Password must be more than 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
})
const onSubmit = (values:z.infer<typeof FormSchema>) => {
    console.log(values);
}
const SingUpForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-1">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="smazouz" type='text'   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="smazouz@example.com" type='email'   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter ur Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full mt-6 " type="submit">
                    Sign Up
                </Button>
                <div className="flex items-center mt-4">
                <div className="flex-grow border-t border-black"></div>
                <span className="px-4 text-gray-500">Or</span>
                <div className="flex-grow border-t border-black"></div>
            </div>
            <p className="mt-4 text-center text-gray-500 ">
                If you have an account, please  &nbsp;
                <Link href="/sing-in" className="text-blue-500 hover:underline">Sign in</Link>
            </p>
            </form>
        </Form>
    )
}
export default SingUpForm