'use client';

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Bell,
  HeartPulse,
  Languages,
  LayoutDashboard,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserButton from './user-button';

const links = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  {
    href: '/symptom-checker',
    label: 'Symptom Checker',
    icon: <Stethoscope />,
  },
  {
    href: '/vaccines',
    label: 'Vaccines',
    icon: <Syringe />,
  },
  {
    href: '/alerts',
    label: 'Health Alerts',
    icon: <Bell />,
  },
  {
    href: '/chat',
    label: 'AI Chat',
    icon: <Languages />,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold font-headline text-sidebar-foreground whitespace-nowrap">
              Swasthya Sahayak
            </h2>
          </div>
          <SidebarTrigger className="ml-auto md:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                  className="text-base"
                >
                  {link.icon}
                  <span className="whitespace-nowrap">{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </>
  );
}
