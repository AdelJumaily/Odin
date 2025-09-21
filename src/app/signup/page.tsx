import { SignupForm } from "@/components/signup-form"
import Link from "next/link"
import Image from "next/image"
import { LinearGradient } from 'react-text-gradients'

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium text-white">
            <Image 
              src="/odin_logo.png" 
              alt="Odin Logo" 
              width={128}
              height={128}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#811bf6]/20 to-black">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white text-6xl font-bold mb-4">
              <LinearGradient gradient={['to right', '#e01300 ,#ff6940']} fallbackColor="#e01300">odin</LinearGradient>
              <LinearGradient gradient={['to right', '#a123f6 ,#5116f6']} fallbackColor="#a123f6"> Valkyrie</LinearGradient>
              <p className="text-xl text-gray-300 mt-2">Centeralized Data Solutions</p>
              <p className="text-gray-400 text-lg mt-4 max-w-md">
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
