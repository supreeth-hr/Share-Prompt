'use client';

import { TbPrompt } from "react-icons/tb";
import { HiHome } from "react-icons/hi";
import Link from 'next/link';
import {useSession,signOut,signIn} from 'next-auth/react';

export const Sidebar = () => {
  const {data:session}=useSession();
  return (
    <div className="flex flex-col items-center gap-4 pr-3">
      <Link href='/'>
        <TbPrompt className="w-24 h-24 cursor-pointer  hover:bg-gray-100 rounded-full transition-all duration-200"/>
      </Link>
      <Link 
      href='/'
      className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit">
        <HiHome className="w-7 h-7"/>
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>
      {session?(
        <button className="bg-red-600 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hiden xl:inline font-semibold"
        onClick={()=>signOut()}>
        Sign Out
      </button>
      ):(
        <button className="bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hiden xl:inline font-semibold"
        onClick={()=>signIn()}>
        Sign In
      </button>
      )}
    </div>
  );
}
