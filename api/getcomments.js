"use server";
import { supabase } from "@/utils/supabase/client";
export async function postsData(PostId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postId", PostId)
    .order("id");
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
  }
}
export async function postCommnets(Data) {
  console.log(Data);
  if (!Data.username || !Data.userId || !Data.postId || !Data.contents) {
    return;
  }
  const { data, error } = await supabase.from("comments").insert({
    comment: Data.contents,
    userId: Data.userId,
    username: Data.username,
    postId: Data.postId,
  });
}
export async function deleteComments(Data) {
  console.log(Data);
  if (!Data.id || !Data.user_Id) {
    return;
  }
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", Data.id);
  // .eq("userId", Data.user_Id);
}
export async function editComments(Data) {
  console.log(Data);
  if (!Data.id || !Data.data) {
    return;
  }
  const { data, error } = await supabase
    .from("comments")
    .update(Data.data)
    .eq("id", Data.id);
}
