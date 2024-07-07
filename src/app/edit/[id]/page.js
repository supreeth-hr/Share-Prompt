import {app} from '../../../firebase';
import {doc,getDoc, getFirestore} from 'firebase/firestore';
import Link from 'next/link';
import { HiArrowLeft} from 'react-icons/hi';
import Edit from '@/components/Edit';

export default async function EditPage({ params }) {
  const db=getFirestore(app);
  let data={};
  const querySnapshot= await getDoc(doc(db,'posts',params.id));
  data={...querySnapshot.data(), id:querySnapshot.id};
  
  return (
    <div className='max-w-xl max-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
        <HiArrowLeft className='h-5 w-5'/>
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      <Edit post={data} id={data.id}/>
    </div>
  );
}