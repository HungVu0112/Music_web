import {useEffect,useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Community() {
    const [posts, setPosts] = useState([]);

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };
    
    useEffect(() => {
        axios.get('http://localhost:9000/getAllPosts')
        .then(res => {
            setPosts(res.data)
        })
        .catch(err => { console.log(err) })
    }, [])

    return (
        <div className="community main-content">
            <div className="title">
                <h1 className="text">Community</h1>
                <i className='bx bxs-group'></i>
            </div>

            <div className="posts-body">
                {posts?.length === 0 ? (
                    <p className='zero_post'>Haven't had any posts yet !</p>
                ) : (
                    posts?.map((post, id) => {
                        return <div className='post' key={id}>
                            <div className='stars'>
                                <i className='bx bxs-heart'></i>
                                {post.likes.count}  
                            </div>

                            <div className='user'>
                                <img width={60} height={60} src={post?.user.avatar}/>
                                <p>{post?.user.username}</p>
                            </div>
                            
                            <p className='date'><i className='bx bxs-time'></i> {(new Date(post.createdAt).toLocaleString('en-US', options))}</p>
                            
                            <hr />

                            <div className='main'>
                                <p className='desc'>{post.desc}</p>
                                <p className='tags'>{post.tags}</p>

                                <div className='playlist'>
                                    <img width={100} height={100} src={post.playlist.image}/>
                                    
                                    <div className='info'>
                                        <p>{post.playlist.name}</p>
                                        <p className='song_count'>{post.playlist.songs.length} Songs</p>
                                    </div>

                                    <Link to={`/community/playlist/${post.playlist._id}`} state={post.playlist} className='play'>
                                        <i className='bx bxs-right-arrow'></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    })
                )}
            </div>
        </div>
    );
}

export default Community;