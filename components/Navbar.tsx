import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./Main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";
import { dark } from "@clerk/themes";

async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div>
          <StoreSwitcher items={stores} />
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto hidden items-center space-x-4 lg:flex">
          <ModeToggle />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              baseTheme: dark,
            }}
          ></UserButton>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
