import { HiArrowLeft} from 'react-icons/hi';
import Link from 'next/link';

export default function About() {
  return (
    <div>
    <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
      <Link href={'/'}>
          <HiArrowLeft className='h-5 w-5'/>
      </Link>
      <h2 className='sm:text-lg'>Back</h2>
    </div>
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">About Share Prompt</h1>
          <p className="text-gray-700 mb-4 text-justify">
            Welcome to Share Prompt, your platform for sharing and discovering optimized AI prompts.
          </p>
          <p className="text-gray-700 mb-4 text-justify">
            At Share Prompt, you can easily post, search, and explore a wide range of AI prompts designed to give the perfect response from AIs like ChatGPT and Google Gemini.
          </p>
          <p className="text-gray-700 mb-8 text-justify">
            Whether you are a developer, researcher, or enthusiast, Share Prompt provides a community-driven space to collaborate and innovate with AI prompts.
          </p>
          <h2 className="text-2xl font-bold text-center">About the Creator</h2>
          <hr className="my-4" />
          <p className="mb-4 text-gray-700 text-justify">
            Hello! My name <span className="font-semibold">Supreeth Hassan Ravindra</span>, currently pursuing a Master of Science in Computer Science at Stevens Institute of Technology, Hoboken, NJ. With a strong foundation from my Bachelors in Computer Science at PES College of Engineering in India, I have honed my skills in Algorithms, Data Mining, Machine Learning, and Cloud Computing. During my tenure at Cognizant Technology Solutions India Pvt Ltd, I led projects in Salesforce application development and integration, leveraging technologies like Apex and Lightning Components to enhance business processes and achieve significant efficiency gains.
          </p>
          <p className="mb-4 text-gray-700 text-justify">
            I am on a pursuit of learning to build web application using MERN stack and Next.js. <b>Share Prompt</b> is my first web application developed in Next.js framework, using the Google Firebase database and storage, as well as Tailwind CSS.
          </p>
          <p className="mb-4 text-gray-700 text-justify">
            Feel free to connect with me via <a href='https://linkedin.com/in/supreethhr' className='text-blue-700 hover:underline' target='_blank' rel='noopener noreferrer'>LinkedIn</a> or check out my projects on <a href='https://github.com/supreeth-hr' className='text-blue-700 hover:underline' target='_blank' rel='noopener noreferrer'>GitHub</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
