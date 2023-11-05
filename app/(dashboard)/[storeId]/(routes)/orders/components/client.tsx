"use client";

import Heading from '@/components/ui/heading'
import { Separator } from '@radix-ui/react-separator';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  return (
    <>
        <Heading
        title={`Orders (${data.length})`}
        discription='Manage orders for your store'
        />
      <Separator/>
      <DataTable columns={columns} data={data} searchKey='products'/>
    </>
  );
};
