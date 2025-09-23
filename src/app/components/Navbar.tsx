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
import { useState, useEffect } from "react"

  // Navigation links array to be used in both desktop and mobile menus
  const navigationLinks = [
    { href: "#platform", label: "Platform" },
    { href: "/company", label: "Company" },
    { href: "/resources", label: "Resources" },
  ]

// Dropdown items for each section
const dropdownItems = {
  solutions: [
    { title: "Overview", href: "/solutions" },
    { title: "Valkyrie", href: "/solutions/valkyrie" },
    { title: "Loki", href: "/solutions/loki" },
    { title: "Thor", href: "/solutions/thor" },
    { title: "Intelligence", href: "/solutions/intelligence" }
  ],
  company: [
    { title: "About Us", href: "/company" },
    { title: "Careers", href: "/careers" },
    { title: "Leadership", href: "/leadership" },
    { title: "Newsroom", href: "/newsroom" },
    { title: "Partners", href: "/partners" }
  ],
  resources: [
    { title: "Documentation", href: "/resources" },
    { title: "API Reference", href: "/resources/api" },
    { title: "Guides", href: "/resources/guides" },
    { title: "Blog", href: "/resources/blog" },
    { title: "Support", href: "/resources/support" }
  ],
  platform: [
    { title: "Features", href: "/platform/features" },
    { title: "Integrations", href: "/platform/integrations" },
    { title: "Security", href: "/platform/security" },
    { title: "Pricing", href: "/platform/pricing" }
  ]
}

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Prevent scrolling when dropdown is open
  useEffect(() => {
    if (activeDropdown || isAnimating) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [activeDropdown, isAnimating])

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveDropdown(null)
        setIsAnimating(false)
      }, 300)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[10001]">
      {/* Logo - positioned on the left, detached */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-[10002]">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span className="text-white text-lg font-bold tracking-wider">ODIN</span>
        </a>
      </div>
      
      {/* Floating glass navbar */}
      <div className="relative ml-auto mr-8 mt-2 w-[800px] z-[10002]">
        <div className="bg-white backdrop-blur-md rounded-md shadow-lg border border-white/30">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">

              {/* Mobile menu trigger */}
              <div className="md:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="group size-8 bg-transparent hover:bg-gray-100 text-black border-0"
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
                    className="w-64 p-1 bg-white border border-gray-200 shadow-lg"
                  >
                    <NavigationMenu className="max-w-none *:w-full">
                      <NavigationMenuList className="flex-col items-start gap-0">
                        {navigationLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <NavigationMenuLink
                              href={link.href}
                              className="block py-3 px-2 text-black hover:text-blue-600 transition-all duration-300"
                            >
                              {link.label.toUpperCase()}
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                        
                        {/* Solutions in mobile */}
                        <NavigationMenuItem className="w-full">
                          <button
                            onClick={() => handleDropdownToggle('solutions')}
                            className="w-full py-3 px-2 text-black hover:text-blue-600 transition-all duration-300 bg-transparent text-left"
                          >
                            SOLUTIONS
                          </button>
                        </NavigationMenuItem>

                        <div className="pt-4 pb-2 border-t border-gray-200 w-full">
                          <Button asChild className="w-full mt-3 bg-black text-white hover:bg-gray-800" size="sm">
                            <a href="/contact">CONTACT US</a>
                          </Button>
                        </div>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Desktop navigation */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-7">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <button
                        onClick={() => handleDropdownToggle(link.href.replace('#', '').replace('/', ''))}
                        className="text-black hover:text-blue-600 px-2 py-1 text-xs font-medium transition-colors uppercase tracking-wide bg-transparent"
                      >
                        {link.label}
                      </button>
                    </NavigationMenuItem>
                  ))}
                  
                  {/* Solutions Dropdown */}
                  <NavigationMenuItem>
                    <button
                      onClick={() => handleDropdownToggle('solutions')}
                      className="text-black hover:text-blue-600 px-2 py-1 text-xs font-medium transition-colors uppercase tracking-wide bg-transparent"
                    >
                      Solutions
                    </button>
                  </NavigationMenuItem>
                                  {/* Search icon */}
                <button className="text-black hover:text-blue-600 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Right side - Search and CTA */}
              <div className="flex items-center gap-6">

                
                {/* Contact button */}
                <Button
                  asChild
                  size="sm"
                  className="bg-black text-white hover:bg-gray-800 px-4 py-1 rounded-md text-xs font-medium transition-all duration-300 flex items-center gap-1"
                >
                  <a href="/contact">
                    CONTACT US
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Overlay */}
      <div className={`fixed inset-0 z-[50] transition-opacity duration-500 ${
        activeDropdown || isAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Left side close area */}
        <div 
          className="fixed top-0 left-0 bottom-0 w-2/5 cursor-pointer"
          onClick={() => handleDropdownToggle(activeDropdown || '')}
          style={{
            cursor: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'45\' fill=\'rgba(255,255,255,0.15)\'/><text x=\'50\' y=\'58\' text-anchor=\'middle\' fill=\'white\' font-size=\'14\' font-family=\'Arial, sans-serif\' font-weight=\'300\'>CLOSE</text></svg>") 50 50, auto'
          }}
        />
        
        {/* Dropdown menu */}
        <div className={`fixed top-0 right-0 bottom-0 w-3/5 bg-black transition-transform duration-500 ease-in-out ${
          activeDropdown ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="w-full h-full flex flex-col pt-20">
            {/* Menu list */}
            <div className="flex-1 px-8 pb-8">
              <div className="space-y-8">
                {activeDropdown && dropdownItems[activeDropdown as keyof typeof dropdownItems]?.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    onClick={() => handleDropdownToggle(activeDropdown)}
                    className="block text-white hover:text-blue-400 transition-colors text-2xl font-medium uppercase tracking-wide"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
