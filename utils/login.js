"use server";
import { createClient } from "@/utils/supabase/client";
export async function Login(formData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");
  console.log("이메일:", email, "비밀번호:", password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data);
  console.log(error);
  // 여기에 실제 회원가입 로직을 구현합니다.
  // 예: 데이터베이스에 사용자 정보 저장
}
