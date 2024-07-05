import Link from 'next/link';
import Icons from './Icons';

export default function Post({post, id}) {
  return (
    <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50'>
        <img
        src={post?.profileImg}
        alt='user-img'
        className='h-11 w-11 rounded-full mr-4'
        />
        <div className='flex-1'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col items-start space-x-1 whitespace-nowrap'>
                    <h4 className='font-bold text-sx truncate'>
                        {post?.name}
                    </h4>
                    <div className='text-xs'>
                        @{post?.username}
                    </div>
                </div>
            </div>

            <Link href={`/posts/${id}`}>
                <p className='text-gray-800 text-sm my-3 text-justify whitespace-normal break-words'>
                <span className='text-gray-700 font-semibold'>About: </span>{post?.topic}
                </p>
            </Link>

            <Link href={`/posts/${id}`}>
                <p className='text-gray-800 text-sm my-3 text-justify whitespace-normal break-words'>
                <span className='text-gray-700 font-semibold'>Prompt: </span>{post?.text}
                </p>
            </Link>

            <Link href={`/posts/${id}`}>
                <img src={post?.image}
                className='rounded-2xl mr-2'/>
            </Link>
            <Icons id={id} uid={post.uid}/>
        </div>
    </div> 
  );
}