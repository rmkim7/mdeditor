'use client';

import TextareaAutosize from 'react-textarea-autosize';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Home() {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/Editor'), { ssr: false }), []
  );

  return (
    <main className='min-h-screen'>
      <div className='flex flex-col px-24 py-10 w-full'>
      <TextareaAutosize 
        placeholder='제목'
        className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
      />
      <Editor onChange={() => {}} />
      </div>
    </main>
  );
}
