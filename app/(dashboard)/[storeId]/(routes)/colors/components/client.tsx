"use client";

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ColorsColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { ApiList } from '@/components/ui/api-list';

interface ColorsClientProps {
  data: ColorsColumn[]
}

export const ColorsClient: React.FC<ColorsClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <Heading
        title={`Colors (${data.length})`}
        discription='Manage colors for your store'
        />
            <Button onClick={()=> router.push(`/${params.storeId}/colors/new`)}>
                <Plus className='mr-2 h-4 w-4'/>
                Add New
            </Button>
      </div>
      <Separator/>
      <DataTable columns={columns} data={data} searchKey='name'/>
      <Heading title='API' discription='API calls for colors'/>
      <Separator/>
      <ApiList entityName='colors' entityIdName='colorId'/>
    </>
  );
};
