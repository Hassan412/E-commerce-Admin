"use client";

import { Store } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModel } from "@/components/modals/alert-model";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be at least 1 characters.",
    }),
  });

type SettingFormValues = z.infer<typeof formSchema>;

const SettingForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams()
    const router = useRouter()
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const origin = useOrigin()

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onsubmit = async (values: SettingFormValues) => {
    try {
        setLoading(true)
        await axios.patch(`/api/stores/${params.storeId}`, values)
        router.refresh()
        toast.success("Store updated")
    } catch (error) {
        toast.error("Something went wrong")
    }finally{
        setLoading(false)
    }
  };

  const onDelete = async () => {
    try {
        setLoading(true)
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh()
        router.push('/')
        toast.success('Store deleted.')
    } catch (error) {
        toast.error("Make sure you removed all products and categories first.")
    } finally{
        setLoading(false)
        setOpen(false)
    }
}

  return (
    <>
    <AlertModel 
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConform={onDelete}
    loading={loading}
    />
      <div className="flex items-center justify-between">
        <Heading title="Settings" discription="Manage  store preferences" />
        <Button variant="destructive" size="icon" onClick={() => setOpen(true)} disabled={loading}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator/>
      <ApiAlert
      title="NEXT_PUBLIC_API_URL"
      discription={`${origin}/api/${params.storeId}`}
      varient="public"
      />
    </>
  );
};

export default SettingForm;
