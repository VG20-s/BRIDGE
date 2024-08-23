// "use client";
import Link from "next/link";
import { handleSignUp } from "../../utils/signup";
const sign = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-900">
      <form action={handleSignUp} className="bg-gray-800 p-8 rounded-lg w-80">
        <h1 className="text-center text-white text-2xl font-bold">
          DevConnect
        </h1>
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
        <div className="mt-8">
          <label htmlFor="email" className="block text-gray-400 text-sm">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="w-full mt-2 p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-8">
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
          회원가입
        </button>
        <Link
          href="LoginCard"
          className="w-full mt-6 p-2 bg-slate-300 text-white rounded-full hover:bg-indigo-300 transition-colors block text-center"
        >
          뒤로가기
        </Link>
      </form>
    </div>
  );
};

export default sign;
