import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium text-white">
            <Image 
              src="/odin_logo.png" 
              alt="Odin Logo" 
              width={32}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#811bf6]/20 to-black">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">odin</h2>
              <p className="text-xl text-gray-300">Autonomous Security Operations</p>
              <p className="text-gray-400 mt-4 max-w-md">
                Advanced cybersecurity platform for modern enterprises. 
                Protect your infrastructure with AI-powered threat detection and response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
