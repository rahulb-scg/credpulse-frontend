import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./use-toast";

interface UsePoolingProps {
  queryFn: () => Promise<any>;
  isNetworkDisabled?: boolean;
  queryKey: string[];
  refetchInterval?: number;
}

const usePooling = ({
  queryFn,
  isNetworkDisabled,
  queryKey = [],
  refetchInterval = 3000,
}: UsePoolingProps) => {
  const [enabled, setEnabled] = useState<boolean>(!isNetworkDisabled);
  const { toast, dismiss, ...rest } = useToast();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pooling", ...queryKey],
    queryFn: queryFn,
    enabled: enabled,
    refetchInterval,
  });

  const onStopFetching = useCallback(() => setEnabled(false), []);
  const onStartFetching = useCallback(() => setEnabled(true), []);

  return {
    data,
    isLoading,
    onStopFetching,
    isError,
    enabled,
    onStartFetching,
  };
};
export default usePooling;
