"use server";
import { supabase } from "@/utils/supabase/client";
export async function postsData() {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
  }
} 
