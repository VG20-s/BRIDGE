"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function handleSignUp(formData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");
  const nickname = formData.get("nickname");
  console.log("이메일:", email, "비밀번호:", password, "닉네임:", nickname);
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        user_name: nickname,
        sen: true,
      },
    },
  });
  console.log(data)
  if (data && !error) {
    redirect("/LoginCard");
  }
  // 여기에 실제 회원가입 로직을 구현합니다.
  // 예: 데이터베이스에 사용자 정보 저장
}
