"use server";
import { supabase } from "@/utils/supabase/client";
export async function getLikes(user_Id) {
  console.log(user_Id);
  const { data, error } = await supabase
    .from("Like")
    .select("postId")
    .eq("userId", user_Id);
  if (error) {
    return { isError: true, data: data };
  } else {
    return { isError: false, data: data };
  }
}
export async function Likes(Data) {
  console.log(Data);
  if (!Data.id || !Data.user_Id) {
    return;
  }
  const { data, error } = await supabase.from("Like").insert({
    postId: Data.id,
    userId: Data.user_Id,
  });
}
export async function disLikes(Data) {
  console.log(Data);
  if (!Data.id || !Data.user_Id) {
    return;
  }
  const { data, error } = await supabase
    .from("Like")
    .delete()
    .eq("postId", Data.id)
    .eq("userId", Data.user_Id);
}
