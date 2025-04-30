import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleIcon } from "./icons/google"
// import logo from '@/assets/logo.svg';


interface DotPatternProp extends React.SVGProps<SVGSVGElement> {
  header: string;
  alt: {
    desc: string;
    link: string;
    text: string;
  }
}


export function AuthForm({
  className,
  header,
  alt
}: DotPatternProp) {

  const googleAuth = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    console.log('sdssd')
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} >
      {/* <Logo className="h-10 w-auto fill-[#020817] stroke-[#020817] dark:fill-primary dark:stroke-primary" /> */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{header}</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
                  required
                />
              </div>
              {/* <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div> */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full gap-3" onClick={(e) => googleAuth(e)}>
                <GoogleIcon /> Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {/* Don&apos;t have an account?{" "} */}
              {alt.desc}{" "} 
              <a href={`/${alt.link}`} className="hover:underline underline-offset-4">
                {alt.text}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
