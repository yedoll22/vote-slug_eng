import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true;

export default function Home ({dummyData, accessToken}) {
//지워주세요
const test = 1;

  const [voteInfo, setVoteInfo] = useState(dummyData);

  const categoryHandler = async (e) => {
    const queryString = e.target.value;
    await axios
    .get('/vote',
    {
      params: {category: queryString}
    },
    {
      header: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((res) => {
      setVoteInfo(res)
    })
  };

  const voteInit = async () => {
    await axios
    .get('/vote')
    .then((res) => {
      setVoteInfo(res)
    })
  };

  useEffect(() => {
    voteInit()
  }, []);

  return (
    <div>
      <div className='p-3'>
        <div>
          Category
        </div>
        <div>
          <button onClick={categoryHandler} value='1' className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>여행</button>
          <button onClick={categoryHandler} value='2' className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>일상</button>
          <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>카테고리3</button>
          <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>카테고리4</button>
          <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>카테고리5</button>
          <button className='m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'>카테고리6</button>
        </div>
      </div>
      <div className='p-3'>
        {voteInfo
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((voteInfo) =>
        // onclick 이벤트로 해당 voteInfo.id에 해당하는 투표를 투표 상세페이지에서 보여준다
            <Link to='/votedetail' key={voteInfo.id} className='transition-all'> 
              <div className='my-4 border-solid border-2 border-red-700'>
                <div>
                  <div>
                    {voteInfo.category}
                  </div>
                  <div className='text-right'>
                    {voteInfo.voteOption1Count + voteInfo.voteOption2Count}
                  </div>
                </div>
                <div>
                  {voteInfo.voteTite}
                  <div>
                    <button className='m-1 p-1 border-solid border-2 border-yellow-400'>{voteInfo.voteOption1}</button>
                    <span>vs</span>
                    <button className='m-1 p-1 border-solid border-2 border-yellow-400'>{voteInfo.voteOption2}</button>
                  </div>
                </div>
              </div>
            </Link>
        )}
      </div>
      <div>
        <menu> 
          <div className='grid grid-cols-3 gap-2'>
            <button className='bg-green-300 m-1 p-1'>프로필 보기</button>
            <button className='bg-yellow-200 m-1 p-1'>+</button>
            <button className='bg-blue-300 m-1 p-1'>로그아웃</button>
          </div>
        </menu>
      </div>
    </div>
  )
}