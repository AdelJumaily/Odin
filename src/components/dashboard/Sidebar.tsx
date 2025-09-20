"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  AlertTriangle,
  Activity,
  Server,
  FileText,
  Settings
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />
  },
  {
    title: 'Downloads',
    href: '/dashboard/downloads',
    icon: <Download className="h-4 w-4" />
  }
];

const securityNavItems: NavItem[] = [
  {
    title: 'Incidents',
    href: '/dashboard/incidents',
    icon: <AlertTriangle className="h-4 w-4" />,
    badge: '23'
  },
  {
    title: 'Events',
    href: '/dashboard/events',
    icon: <Activity className="h-4 w-4" />
  },
  {
    title: 'Devices',
    href: '/dashboard/devices',
    icon: <Server className="h-4 w-4" />
  }
];

const reportsNavItems: NavItem[] = [
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText className="h-4 w-4" />
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />
  }
];

export function Sidebar({ className }: SidebarProps) {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const NavItem = ({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) => {
    const isActive = pathname === item.href;
    
    const content = (
      <Link href={item.href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={`w-full justify-start ${isActive ? "bg-primary/10 text-primary" : ""}`}
        >
          {item.icon}
          {!isCollapsed && (
            <>
              <span className="ml-2">{item.title}</span>
              {item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </Button>
      </Link>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {content}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  };

  const NavSection = ({ 
    title, 
    items, 
    isCollapsed 
  }: { 
    title: string; 
    items: NavItem[]; 
    isCollapsed: boolean 
  }) => (
    <div className="space-y-1">
      {!isCollapsed && (
        <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex h-full flex-col border-r bg-background ${className}`}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {!isExpanded && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
          </div>
        )}
        {isExpanded && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Odin Security</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8"
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <div className="flex-1 space-y-6 p-4">
        <NavSection 
          title="Overview" 
          items={mainNavItems} 
          isCollapsed={!isExpanded} 
        />
        
        <NavSection 
          title="Security" 
          items={securityNavItems} 
          isCollapsed={!isExpanded} 
        />
        
        <NavSection 
          title="Reports & Settings" 
          items={reportsNavItems} 
          isCollapsed={!isExpanded} 
        />
      </div>

      {/* Footer */}
      <div className="p-4">
        <div className={`rounded-lg bg-muted p-3 ${!isExpanded ? 'text-center' : ''}`}>
          {!isExpanded ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">O</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">O</span>
                </div>
                <span className="text-sm font-medium">Odin Security</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Advanced threat monitoring
              </p>
              <Button size="sm" className="w-full">
                Upgrade Plan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
