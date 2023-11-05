import prismadb from "@/lib/prismadb";

export const getTotalProducts = async (storeId: string) => {
  const paidOrders = await prismadb.product.count({
    where: {
      storeId: storeId,
      isArchived: false
    },
  });

  return paidOrders

};
