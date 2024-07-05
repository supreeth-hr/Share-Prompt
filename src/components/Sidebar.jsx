'use client';
import { HiHome, HiDotsHorizontal } from "react-icons/hi";
import Link from 'next/link';
import Image from "next/image";
import { useSession, signOut, signIn } from 'next-auth/react';

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col p-3 justify-between items-end h-screen'>
      <div className=' ml-10 flex flex-col gap-4'>
        <Link href='/'>
        <div className="pr-8 pt-8">
          <Image
            src='/images/logo-text.svg'
            alt='logo'
            width={230}
            height={150}
            className='object-contain'
          />
        </div>
        </Link>
          <Link
            href='/'
            className='flex pt-6 pl-12 items-end transition-all duration-200 gap-1 w-fit'
          >
            <HiHome className='w-7 h-7' />
            <span className='font-bold hidden xl:inline'>Home</span>
          </Link>
        {session ? (
          <button
            className='bg-red-600 text-white rounded-full mt-4  hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold'
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className='bg-blue-400 text-white rounded-full mt-4 hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline font-semibold'
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className='text-gray-700 text-sm flex mr-9 items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200'>
          <img
            src={session.user.image}
            alt='user-img'
            className='h-10 w-10 rounded-full xl:mr-2'
          />
          <div className='hidden xl:inline'>
            <h4 className='font-bold'>{session.user.name}</h4>
            <p className='text-gray-500'>@{session.user.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}