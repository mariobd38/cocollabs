"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useSignIn, useSignUp } from '@clerk/nextjs'



interface PageProps extends React.SVGProps<SVGSVGElement> {
  header: string;
  alt: {
    desc: string;
    link: string;
    text: string;
    button: string;
    subheader: string;
  }
}


export function AuthForm({
  className,
  header,
  alt
}: PageProps) {
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()


  
  const handleGoogleRedirect = async () => {
    try {
      // await signIn?.authenticateWithRedirect({
      //   strategy: 'oauth_google',
      //   redirectUrl: '/sign-up/sso-callback', // where to send after successful login
      //   redirectUrlComplete: '/', // where to send after successful login completion
      // })
      await signUp?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sign-up/sso-callback', // where to send after successful login
        redirectUrlComplete: '/', // where to send after successful login completion
      })
    } catch (error) {
      console.error('Google redirect error:', error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} >
      {/* <Logo className="h-10 w-auto fill-[#020817] stroke-[#020817] dark:fill-primary dark:stroke-primary" /> */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{header}</CardTitle>
          <CardDescription>
            Enter your email below to {alt.subheader}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form > */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
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
                {alt.button}
              </Button>
              {/* https://wired-eft-39.clerk.accounts.dev/v1/oauth_callback */}
              <Button variant="outline" className="w-full gap-3" onClick={handleGoogleRedirect} >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                {alt.button} with Google
              </Button>
              {/* CAPTCHA Widget */}
              <div id="clerk-captcha"></div>
            </div>
            <div className="mt-4 text-center text-sm">
              {/* Don&apos;t have an account?{" "} */}
              {alt.desc}{" "} 
              <a href={`/${alt.link}`} className="hover:underline underline-offset-4">
                {alt.text}
              </a>
            </div>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  )
}
