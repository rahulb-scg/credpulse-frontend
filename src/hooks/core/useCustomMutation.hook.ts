import { APIResponse, ApiService } from "@/utils/api-service.utils";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { ZodTypeAny, z } from "zod";

interface UseCustomMutationProps<TData> {
  endPoint: string;
  schema: ZodTypeAny;
  method?: "post" | "put";
  onSuccess?: (data: TData) => void;
  isLoggedIn?: boolean; // for next auth
}
interface UseCustomMutationPropsReturnType<TBody, TData> {
  isPending?: boolean;
  onSubmit: (data: TBody) => void;
  isError?: boolean;
  asyncOnSubmit: (data: TBody) => Promise<APIResponse<TData>>;
  error?: Error | null;
  service: any;
}
const useCustomMutation = <TData>({
  endPoint,
  schema,
  method = "post",
  onSuccess,
  isLoggedIn = true,
}: UseCustomMutationProps<TData>): UseCustomMutationPropsReturnType<
  z.infer<typeof schema>,
  TData
> => {
  const service = useMemo(() => new ApiService<TData>(endPoint), [endPoint]);
  const {
    mutate: onSubmit,
    isPending,
    error,
    isError,
    mutateAsync: asyncOnSubmit,
  } = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      // if (isLoggedIn)
      //   service.headers.Authorization = `Bearer ${session}`;
      if ("post" === method) return await service.post(data);
      return await service.put(data);
    },
    onSuccess(data: APIResponse<TData>) {
      onSuccess?.(data.data as TData);
    },
  });
  return {
    onSubmit,
    isPending,
    isError,
    asyncOnSubmit,
    error,
    service,
    // isPending,
    // onSubmit,
  };
};

export default useCustomMutation;
