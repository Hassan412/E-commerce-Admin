import prismadb from "@/lib/prismadb";

export const getSaleCount = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId: storeId,
      isPaid: true,
    },
    include: {
      orderItems: true
    },
  });
  const totalSaleCount = paidOrders.reduce((total,Count)=> {
    return total + Count.orderItems.length
  },0)

  return totalSaleCount
};
