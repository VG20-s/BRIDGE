import useSWR from "swr";
import { postsData } from "./getcomments";
export const useComments = (PostId) => {
  const { data, error, isLoading } = useSWR(
    PostId ? ["Comments", PostId] : null,
    () => postsData(PostId),
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
