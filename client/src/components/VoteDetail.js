import { useState, useEffect } from 'react'
import axios from 'axios';

export default function VoteDetail ( { id, accessToken }) {

  console.log(id)

  const [thisVoteInfo, setThisVoteInfo] = useState([]);

  const voteDetailHandler = () => {
      axios
      .get('/vote', 
      {
        // id를 params로 보내야 한다.
      },
      {
        header: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        setThisVoteInfo(res)
      }
      )
  }

  useEffect(() => {
    voteDetailHandler()
  }, [])

  return (
    <div>
      <div>
        Vote-Slug
      </div>
      <div>

      </div>
    </div>
  )
}