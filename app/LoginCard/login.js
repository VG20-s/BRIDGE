"use server";
import { supabase } from "@/utils/supabase/client";
export async function Login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("이메일:", email, "비밀번호:", password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return { success: false, data: error };
  } else {
    return { success: true, data: data };
  }
}
