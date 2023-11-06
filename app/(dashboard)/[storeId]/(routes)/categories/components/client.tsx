"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoriesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CatergoryClientProps {
  data: CategoriesColumn[];
}

export const CategoryClient: React.FC<CatergoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Heading
          title={`Catergories (${data.length})`}
          discription="Manage Catergories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" discription="API calls for Catergories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="catergoryId" />
    </>
  );
};
