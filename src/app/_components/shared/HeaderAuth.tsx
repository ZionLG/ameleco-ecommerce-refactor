"use client";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { LogIn, LogOut, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { User } from "next-auth";

function HeaderAuth({ user }: { user?: User }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <UserCircle2 strokeWidth={1} size={36} opacity={isOpen ? 0.5 : 1} />
      </DropdownMenuTrigger>
      {user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name ?? user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={closeMenu}>
            <Link href={"/account/profile"} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem onClick={closeMenu}>
              <Link href={"/admin"} className="w-full">
                Staff Dashboard
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href="/api/auth/signout"
              className="flex items-center"
              onClick={closeMenu}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuLabel>Guest</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href="/api/auth/signin"
              className="flex items-center"
              onClick={closeMenu}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Log In</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default HeaderAuth;
