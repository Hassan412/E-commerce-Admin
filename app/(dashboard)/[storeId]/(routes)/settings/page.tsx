import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import SettingForm from "./components/setting-form";

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const {userId} = auth();

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId,
            id: params.storeId
        }
    })

    if (!store) {
        redirect('/')
    }
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-6">
            <SettingForm initialData={store}></SettingForm>
        </div>
    </div>
  )
}

export default SettingsPage