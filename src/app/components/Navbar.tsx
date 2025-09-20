// app/components/Navbar.tsx (or wherever you keep it)

// import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react"

import Logo from "@/registry/default/components/navbar-components/logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#solutions", label: "Solutions" },
  { href: "#company", label: "Company" },
  { href: "#resources", label: "Resources" },
  { href: "#customers", label: "Customers" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="flex h-16 items-center justify-center gap-8">
          {/* Mobile menu trigger - positioned absolute left */}
          <div className="absolute left-8 md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 bg-transparent hover:bg-white/10 text-white border-0"
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>

              {/* Mobile menu content */}
              <PopoverContent
                align="start"
                className="w-64 p-1 bg-black/95 backdrop-blur-md border-white/10"
              >
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="block py-3 px-2 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(129,27,246,0.5)] hover:shadow-lg"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}

                    <div className="pt-4 pb-2 border-t border-white/10 w-full">
                      <NavigationMenuLink
                        href="/login"
                        className="block py-3 px-2 text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(129,27,246,0.5)] hover:shadow-lg"
                      >
                        Login
                      </NavigationMenuLink>

                      <Button asChild className="cta-button w-full mt-3" size="sm">
                        <a href="/login">Get Started</a>
                      </Button>
                    </div>
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>

          {/* Centered content: Logo + Nav */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-white hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(129,27,246,0.5)] hover:shadow-lg"
              aria-label="Home"
            >
              <img src="/odin_logo.png" alt="Odin Logo" className="h-8 w-auto" />
            </a>

            {/* Desktop nav */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-6">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      href={link.href}
                      className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover:underline underline-offset-8 decoration-white/30"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth buttons - positioned absolute right */}
          <div className="absolute right-8 flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:text-white bg-transparent hover:bg-white/5 transition-colors rounded-full px-4"
            >
              <a href="/login">Login</a>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-[#811bf6] to-[#6b1bb8] border-0 text-white hover:from-[#6b1bb8] hover:to-[#5a1a9e] px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(129,27,246,0.6)] hover:shadow-lg"
            >
              <a href="/login">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
