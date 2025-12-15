"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const NavLinks = ({ isMobileNav = false, username }: { isMobileNav?: boolean; username?: string }) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

        if (item.route === "/profile") {
          if (username) item.route = `${item.route}/${username}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive ? "text-primary-500 border-l-2 border-primary-500" : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4 pl-11"
            )}
          >
            <Image
              src={isActive ? item.activeURL : item.inactiveURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn("hidden dark:block")}
            />
            <Image
              src={isActive ? item.activeURL : item.inactiveLightURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn("block dark:hidden")}
            />
            <p className={cn(isActive ? "base-bold" : "base-medium", !isMobileNav && "max-lg:hidden")}>{item.label}</p>
          </Link>
        );

        return (
            <Fragment key={item.route}>{LinkComponent}</Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
