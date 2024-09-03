"use server";
import { supabase } from "@/utils/supabase/client";
export async function postsData() {
  const { data, error } = await supabase.from("Posts").select("*");
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
  }
}
