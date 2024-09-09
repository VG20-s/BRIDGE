"use server";
import { supabase } from "@/utils/supabase/client";
export async function Posts(Data) {
  if (!Data.title || !Data.user_Id || !Data.Nickname || !Data.dueDate) {
    return;
  }
  console.log(Data);
  const { data, error } = await supabase.from("Posts").insert({
    title: Data.title,
    contents: Data.contents,
    tags: Data.tags,
    createrId: Data.user_Id,
    isDone: false,
    dueDate: Data.dueDate,
    Nickname: Data.Nickname,
  });
  console.log(error)
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
  }
}
