"use server";
import { supabase } from "@/utils/supabase/client";

export async function getrooms(Ids) {
  const { data, error } = await supabase
    .from("rooms")
    .select("id,participants")
    .contains("participants", Ids);
  if (error) {
    return { isError: true, data: data };
  } else {
    return { isError: false, data: data };
  }
}

export async function createRooms(Data) {
  if (!Data) {
    return;
  }
  const { data, error } = await supabase
    .from("rooms")
    .insert({
      participants: Data,
    })
    .select();
  return data;
}
