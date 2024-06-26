import { DictionaryType } from "@/types/common.type";
import { APIResponse, ApiService } from "@/utils/api-service.utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UseQueryListProps {
  endPoint: string;
  isLoggedIn?: boolean;
  method?: "getAll" | "search";
  searchParams?: DictionaryType;
}

interface GetQueryListReturnProps<TData>
  extends Omit<CustomQueryListReturnProps<TData>, "data"> {
  data: TData[];
}
interface CustomQueryListProps<TData> {
  queryFunction: () => Promise<APIResponse<TData>>;
  extraQueryKey: any[];
  disableNetwork?: boolean;
}
interface CustomQueryListReturnProps<TData> {
  isLoading?: boolean;
  data: TData;
}
const useQueryList = <TData>({
  endPoint,
  isLoggedIn = true,
  method = "getAll",
  searchParams,
}: UseQueryListProps): GetQueryListReturnProps<TData> => {
  const { data, isLoading } = useCustomQueryList({
    queryFunction: async () => {
      const service = new ApiService(endPoint);
      // if (isLoggedIn)
      //   service.headers.Authorization = `Bearer ${session.data?.access_token}`;
      if (method === "getAll") {
        return await service.getAll();
      }
      return await service.search(searchParams as any);
    },
    extraQueryKey: [`get all ${endPoint}`, searchParams],
    // disableNetwork: !session?.data?.access_token,
  });
  return { data: data as TData[], isLoading };
};

const useCustomQueryList = <TData>({
  queryFunction,
  extraQueryKey,
  disableNetwork,
}: CustomQueryListProps<TData>): CustomQueryListReturnProps<TData> => {
  const { data, isLoading } = useQuery({
    queryKey: extraQueryKey,
    queryFn: queryFunction,
    enabled: !disableNetwork,
  });
  return { data: data?.data as TData, isLoading };
};

export default useQueryList;
