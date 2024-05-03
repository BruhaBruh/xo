'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Header: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <header className="container flex items-center justify-between h-20">
      <Link href="/">
        <span className="sr-only">To main page</span>
        <Image
          aria-hidden="true"
          src="/favicon.png"
          alt="logo"
          width={48}
          height={48}
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
