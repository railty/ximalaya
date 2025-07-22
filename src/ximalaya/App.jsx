import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react';

function App() {

  useEffect(() => {
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <a className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300" href='https://www.ximalaya.com' target="_blank" rel="noopener noreferrer">喜马拉雅</a>
      <ul className='mt-4 text-gray-700'>
        <li>Buy the audio books using ximalaya windows app, login and pay using wechat</li>
        <li>Download the audio books using this extension.</li>
        <li>copy the android phone by USB cable</li>
        <li>play the audio books using VLC player.</li>
      </ul>
    </div>
  )
}

export default App
