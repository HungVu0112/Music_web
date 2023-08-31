import axios from 'axios';
import { useState, useEffect } from 'react';

function Shared() {
  const [data, setData] = useState([]);
  const userJSON = sessionStorage.getItem("account");
  const user = JSON.parse(userJSON);

  useEffect(() => {
    axios.get(`http://localhost:9000/getSharedListByUserID/${user._id}`, data)
        .then(res => {
            setData(res.data);
        })
        .catch(err => { console.log(err); })
}, [])


  return (
    <div className='playlist-shared main-content'>
      {data.length === 0 ? (
        <p className='loading'>You haven't shared any playlist yet!</p>
      ) : (
        <>
          <div className='title'>
            Total: {data.length}
          </div>

          <hr />

          {data.map((post, id) => {
            return (
                <div className="playlist" key={id}>
                  <p className="number">{id + 1}</p>
                                    
                  <div className="playlist-title">
                    <div>{post.playlist.name}</div>
                    <p>Songs: {post.playlist.songs ? post.playlist.songs.length : 0}</p>
                                        
                    <div className="option">
                      <p>Likes: {post.likes}</p>
                    </div>
                  </div>
                </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Shared