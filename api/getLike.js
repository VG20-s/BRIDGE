"use server";
import { supabase } from "@/utils/supabase/client";
export async function postsData() {
  const { data, error } = await supabase
    .from("Like")
    .select("name, countries(*)")
    .eq("countries.name", "Estonia");
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
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
  const { data, error } = await supabase.from("Like").delete.match({
    postId: Data.id,
    userId: Data.user_Id,
  });
} 
