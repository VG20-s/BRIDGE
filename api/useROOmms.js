import useSWR from "swr";
import { getrooms } from "./useRooms";
import { useUserStore } from "@/store/initial";

export const useGetrooms = () => {
  const { user_Id } = useUserStore((store) => store);
  const { data, error, isLoading } = useSWR(
    user_Id ? ["likes", user_Id] : null,
    () => getrooms([user_Id]),
    {
      revalidateOnReconnect: true, // 네트워크 재연결 시 자동 갱신
    }
  );
  console.log(data);
  return {
    data,
    isLoading,
    isError: error,
  };
};
