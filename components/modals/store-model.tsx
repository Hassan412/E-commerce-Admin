"use client";

import * as z from "zod";
import { Model } from "../ui/model";
import { useStoredModel } from "@/hooks/use-store-model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
});

export const StoredModel = () => {
  const storedModels = useStoredModel();

  const [loading, setloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setloading(true)

      const response = await axios.post('/api/stores', values)
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error("something went wrong")
    } finally {
      setloading(false)
    }
  };

  return (
    <Model
      title="Create store"
      description="Add new store to manage products and categories"
      isOpen={storedModels.isOpen}
      onclose={storedModels.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-commerce"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="p-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={storedModels.onClose}
                  disabled={loading}

                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};
