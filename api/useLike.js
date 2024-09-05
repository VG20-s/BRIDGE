import useSWR from "swr";
import { getLikes } from "./getLike";
import { useUserStore } from "@/store/initial";
export const useLike = () => {
  const { user_Id } = useUserStore((store) => store);
  const { data, error, isLoading } = useSWR(
    user_Id ? ["likes", user_Id] : null,
    () => getLikes(user_Id),
    {
      revalidateOnReconnect: true, // 네트워크 재연결 시 자동 갱신
    }
  );
  return {
    data,
    isLoading,
    isError: error,
  };
};
