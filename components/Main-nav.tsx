"use client";

import { useProgressModel } from "@/hooks/use-progress-model";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import { dark } from "@clerk/themes";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
} from "./ui/sheet";
function MainNav({ className }: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const progress = useProgressModel();
  const UserProfilePage = () => (
    <UserProfile path="/user-profile" routing="path" />
  );
  const routes = useMemo(()=> [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
      mobileId: 5,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ],[params.storeId, pathname]);
  useEffect(() => {
    if (routes.some((route) => route.active)) {
      progress.onChange();
      const timer = setTimeout(() => {
        progress.onClose();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, progress, routes]);

  return (
    <div className="flex justify-between">
      <nav
        className={cn(
          "items-center space-x-4 lg:space-x-6 hidden lg:flex",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            onClick={() => {
              if (route.active === false) {
                progress.onOpen();
              }
            }}
            className={cn(
              "text-sm font-bold transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center gap-x-2 lg:hidden">
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="py-12">
          <SheetHeader>
            <ModeToggle />
          </SheetHeader>
          <div className="space-y-4 space-x-2 my-6">
            {routes.map((route, index) => (
              <Button variant={"outline"} key={index}>
                <Link
                  href={route.href}
                  key={index}
                  onClick={() => {
                    if (route.active === false) {
                      progress.onOpen();
                    }
                  }}
                  className={cn(
                    "text-sm font-bold transition-colors hover:text-primary",
                    route.active
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
          <SheetFooter>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: dark,
              }}          
            >
            </UserButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MainNav;
