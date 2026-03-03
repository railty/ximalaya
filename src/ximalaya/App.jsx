import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 font-sans'>
      <div className='max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 transform transition-all'>
        <div className='flex items-center justify-center mb-8'>
          <div className='bg-orange-500 p-4 rounded-2xl shadow-lg mr-4'>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </div>
          <h1 className='text-4xl font-extrabold text-slate-800 tracking-tight'>喜马拉雅下载器</h1>
        </div>

        <div className='space-y-6'>
          <section>
            <h2 className='text-xl font-bold text-slate-700 mb-3 border-b pb-2'>功能说明</h2>
            <div className='grid gap-4'>
              <div className='flex items-start bg-orange-50 p-4 rounded-xl'>
                <span className='bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded mr-3 mt-1 shrink-0'>下载全部</span>
                <div>
                  <p className='text-sm text-slate-700 font-medium'>自动滚动并下载该专辑下的所有音轨。它会自动识别并跳过您已经下载过的文件。</p>
                </div>
              </div>
              <div className='flex items-start bg-blue-50 p-4 rounded-xl'>
                <span className='bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mr-3 mt-1 shrink-0'>下载本页</span>
                <div>
                  <p className='text-sm text-slate-700 font-medium'>仅下载当前页面显示的音轨。适合只想针对性下载一部分内容的场景。</p>
                </div>
              </div>
              <div className='flex items-start bg-green-50 p-4 rounded-xl'>
                <span className='bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-2 py-1 rounded mr-3 mt-1 shrink-0'>本地列表</span>
                <div>
                  <p className='text-sm text-slate-700 font-medium'>选择您存放音频的本地文件夹。插件会扫描该文件夹以确保不会重复下载相同的内容。</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className='text-xl font-bold text-slate-700 mb-3 border-b pb-2'>快捷指南</h2>
            <ul className='space-y-3 text-slate-600 ml-2'>
              <li className='flex items-center'>
                <span className='w-6 h-6 flex items-center justify-center bg-slate-200 rounded-full text-xs font-bold mr-3'>1</span>
                <span>在喜马拉雅官网购买您喜爱的音频。</span>
              </li>
              <li className='flex items-center'>
                <span className='w-6 h-6 flex items-center justify-center bg-slate-200 rounded-full text-xs font-bold mr-3'>2</span>
                <span>导航到专辑详情页。</span>
              </li>
              <li className='flex items-center'>
                <span className='w-6 h-6 flex items-center justify-center bg-slate-200 rounded-full text-xs font-bold mr-3'>3</span>
                <span>点击页面上的下载按钮开始。</span>
              </li>
            </ul>
          </section>
        </div>

        <div className='mt-10 pt-6 border-t flex justify-center'>
          <a className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" href='https://www.ximalaya.com' target="_blank" rel="noopener noreferrer">
            前往喜马拉雅官网
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
