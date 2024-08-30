"use client";
import Link from "next/link";
import { Login } from "./login";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/initial";
const LoginCard = () => {
  const router = useRouter();
  const set_user = useUserStore((state) => state.set_user);
  const handleSubmit = async (e) => {
    const a = {};
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await Login(formData);
    if (result.success) {
      console.log(result.data);
      set_user(result.data.user.user_metadata);
      router.push("/Post");
    } else {
      console.log(result.data);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-900 ">
      <form
        onSubmit={handleSubmit}
        style={{ width: "320px" }}
        className="bg-gray-800 p-8 rounded-lg"
      >
        <h1 className="text-center text-white text-2xl font-bold">
          DevConnect
        </h1>
        <p className="text-center text-indigo-500 text-sm mt-1">
          &lt;Connect with="developers" /&gt;
        </p>

        <div className="mt-8">
          <label htmlFor="email" className="block text-gray-400 text-sm">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-2 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-400 text-sm">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full mt-2 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
        >
          로그인
        </button>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="w-[48%] p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            GitHub
          </button>
          <button
            type="button"
            className="w-[48%] p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            KaKao
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          계정이 없으신가요?
          <Link href="sign" className="text-indigo-500 hover:underline">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
  s;
};

export default LoginCard;
