'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  doc,
  setDoc,
  serverTimestamp,
  getFirestore,
} from 'firebase/firestore';
import { app } from '../firebase';

export default function Edit({ post, id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [imageFileUrl, setImageFileUrl] = useState(post.image || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [text, setText] = useState(post.text || '');
  const [topic, setTopic] = useState(post.topic || '');
  const [postLoading, setPostLoading] = useState(false);
  const imagePickRef = useRef(null);
  const db=getFirestore(app);

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        alert('The Image should be less than 2 MB');
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleCancelImage = () => {
    setSelectedFile(null);
    setImageFileUrl(null);
    if (imagePickRef.current) {
      imagePickRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    const topicKeywords = topic.toLowerCase().split(' ').map(word => word.replace(/^#/, ''));
    setPostLoading(true);
    try {
    const DocRef = doc(db,'posts',id);
    await setDoc(DocRef,
         {text: text,
          topic: topic,
          topicKeywords: topicKeywords,
          profileImg:session.user.image,
          timestamp:serverTimestamp(),
          image: imageFileUrl,}, 
          { merge: true });
      setPostLoading(false);
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error('Error updating document:', error);
      setPostLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3 w-full'>
      <img
        src={session.user.image}
        alt='user-img'
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
      />
      <div className='w-full divide-y divide-gray-200'>
        <div className='flex flex-col mb-3'>
          <label className='text-gray-700 font-semibold' htmlFor='topic'>
            What&apos;s the Prompt about? Be specific.
          </label>
          <textarea
            id='topic'
            className='w-full border-2 rounded outline-none tracking-wide min-h-[30px] text-gray-700 mt-1'
            placeholder='Type here (You can use #hashtags)'
            rows='2'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-3 pt-2'>
          <label className='text-gray-700 font-semibold' htmlFor='prompt'>
            Share your AI prompt
          </label>
          <textarea
            id='prompt'
            className='w-full border-2 rounded outline-none tracking-wide min-h-[50px] text-gray-700 mt-1'
            placeholder='Type here'
            rows='3'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {imageFileUrl && (
          <div className='relative'>
            <img
              src={imageFileUrl}
              alt='image'
              className={`w-full max-h-[250px] object-cover cursor-pointer ${
                imageFileUploading ? 'animate-pulse' : ''
              }`}
            />
            <button
              className='absolute top-2 right-2 bg-white bg-opacity-50 text-gray-700 rounded-full p-1 hover:bg-opacity-75'
              onClick={handleCancelImage}
            >
              Cancel
            </button>
          </div>
        )}
        <div className='flex items-center justify-between pt-2.5'>
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current.click()}
            className='h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer'
          />
          <input
            key={
              selectedFile
                ? selectedFile.name + selectedFile.size
                : 'file-input'
            }
            type='file'
            ref={imagePickRef}
            accept='image/*'
            onChange={addImageToPost}
            hidden
          />
          <button
            disabled={
              topic.trim() === '' ||
              text.trim() === '' ||
              postLoading ||
              imageFileUploading
            }
            className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}