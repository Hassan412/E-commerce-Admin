import { UserButton, auth } from "@clerk/nextjs"
import MainNav from "./Main-nav"
import StoreSwitcher from "./store-switcher"
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ModeToggle } from "./theme-toggle";

async function Navbar() {
    const {userId} = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId: userId
        }
    })
  return (

    <div className="border-b">
        <div className="flex h-16 items-center px-4">
            <div>
                <StoreSwitcher items={stores}/>
            </div>
            <MainNav className="mx-6"/>
            <div className="ml-auto flex items-center space-x-4">
                <ModeToggle/>
                <UserButton afterSignOutUrl="/"></UserButton>
            </div>
        </div>
    </div>
  )
}

export default Navbar