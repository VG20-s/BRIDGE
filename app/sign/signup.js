"use server";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
export async function handleSignUp(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const nickname = formData.get("nickname");
  const stack = formData.get("stack");
  const sen = formData.get("sen");
  console.log("이메일:", email, "비밀번호:", password, "닉네임:", nickname);
  console.log(stack);
  if (!email && !password && !nickname) {
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        user_name: nickname,
        sen: sen,
        stack: sen ? stack : "",
      },
    },
  });
  console.log(data)
  console.log(error)
  if (data && !error) {
    redirect("/LoginCard");
  }
}
