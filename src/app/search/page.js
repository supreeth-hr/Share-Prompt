'use client';

import { useState, useEffect } from 'react';
import { app } from '../../firebase';
import Post from '../../components/Post';
import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [postinf, setPostinf] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  const handleSearch = async () => {
    setLoading(true);
    const keywords = searchQuery.toLowerCase().split(' ');
    const q = query(collection(db, 'posts'), where('topicKeywords', 'array-contains-any', keywords));
    const querySnapshot = await getDocs(q);
    const postsArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostinf(postsArray);
    setLoading(false);
    setSearchQuery('');
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row items-center gap-2 border-b-2 border-gray-200 rounded'>
        <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search by keyword..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}/>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 mb-2 rounded mt-2 hover:opacity-85"
          disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div className="mt-4">
        {postinf.map((post) => (
          <Post key={post.id} post={post} id={post.id} />
        ))}
      </div>
    </div>
  );
}
