"use client"
import { useQuery } from "@tanstack/react-query"

interface UseQueryListProps {
  endPoint: string
  searchParams?: {
    page: number
    page_size: number
    [key: string]: any
  }
}

const useQueryList = <TData>({ endPoint, searchParams }: UseQueryListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [endPoint, searchParams],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: searchParams?.page?.toString() || "1",
        page_size: searchParams?.page_size?.toString() || "20"
      })

      const response = await fetch(`/api/${endPoint}?${queryParams}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()
      return jsonData
    }
  })

  return {
    data,
    isLoading,
    totalPages: data?.pagination?.totalPages || 1
  }
}

export default useQueryList
