"use client";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
  entityIdName,
  entityName,
}) => {
  const origin = useOrigin();
  const params = useParams();
  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        varient="public"
        discription={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        varient="admin"
        discription={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        varient="admin"
        discription={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        varient="admin"
        discription={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
