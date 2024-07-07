'use client'

import Link from 'next/link';
import Icons from './Icons';
import { useState } from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { useSession} from 'next-auth/react';
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function Post({post, id}) {
  const {data:session}=useSession();
  const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
      };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

  return (
    <div className='flex flex-col p-3 border-b border-gray-200 hover:bg-gray-50'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start space-x-4'>
          <img
            src={post?.profileImg}
            alt='user-img'
            className='h-11 w-11 rounded-full'
            width={44}
            height={44}
          />
          <div>
            <h4 className='font-bold text-sm'>{post?.name}</h4>
            <div className='text-xs'>@{post?.username}</div>
          </div>
        </div>
        {session?.user?.uid === post.uid &&(
        <Link href={`/edit/${id}`}>
        <MdOutlineEdit
          className='h-5 w-5 mr-2 mt-2 cursor-pointer hover:bg-gray-400 rounded-full transition-all duration-200'/>
        </Link>)}
      </div>

      <div className='mt-3'>
        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 text-sm mb-3 whitespace-normal break-words text-justify'>
            <span className='text-gray-700 font-semibold'>About: </span>{post?.topic}
          </p>
        </Link>

        <Link href={`/posts/${id}`}>
          <p className='text-gray-800 text-sm mb-3 whitespace-normal break-words text-justify'>
            <span className='text-gray-700 font-semibold'>Prompt: </span>{post?.text}
          </p>
        </Link>

        <button
            className='mb-3 text-gray-500 hover:text-gray-700'
            onClick={() => copyToClipboard(post?.text)}
            title='Copy Prompt'
          >
            <HiOutlineClipboardCopy className='h-5 w-5' />
          </button>

        {post?.image && (
          <div className='cursor-pointer mb-3 ml-2' onClick={toggleModal}>
            <img
              src={post.image}
              className='rounded-2xl'
              width={500}
              height={300}
            />
          </div>
        )}

        <Icons id={id} uid={post.uid} />
      </div>

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
          <div className='max-w-full bg-white rounded-lg shadow-lg'>
            <img
              src={post?.image}
              alt='modal-image'
              className='max-w-full max-h-screen rounded-lg'
              width={1000}
            />
            <button
              className='absolute top-4 right-4 text-white hover:text-gray-400'
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div> 
  );
}