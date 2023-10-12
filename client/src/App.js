import { Route, Routes, Link} from 'react-router-dom';
import { useState } from 'react'; 
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage/Home';
import PageContent from './pages/HomePage/PageContent';
import Artists from './pages/HomePage/Artists';
import ArtistDisplay from './pages/HomePage/ArtistDisplay';
import RecentPlayed from './pages/HomePage/RecentPlayed';
import Favourite from './pages/HomePage/Favourites';
import MyPlaylist from './pages/HomePage/MyPlaylist';
import Community from './pages/HomePage/Community';
import Search from './pages/HomePage/Search';
import Albums from './pages/HomePage/Albums';
import SongsDisplay from './pages/HomePage/SongsDisplay';
import PlaylistDisplay from './pages/HomePage/PlaylistDisplay';
import Shared from './pages/HomePage/Shared';
import PostPlaylist from './pages/HomePage/PostPlaylist';
import './css/App.css';
import User from './pages/HomePage/User';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/home' element={<PageContent><Home /></PageContent>} />
        <Route exact path='/search' element={<PageContent><Search /></PageContent>} />
        <Route exact path='/artists' element={<PageContent><Artists /></PageContent>} />
        <Route exact path='/artists/:name' element={<PageContent><ArtistDisplay /></PageContent>} />
        <Route exact path='/library' element={<PageContent><MyPlaylist /></PageContent>} />
        <Route exact path='/library/recent' element={<PageContent><RecentPlayed /></PageContent>} />
        <Route exact path='/library/favourite' element={<PageContent><Favourite /></PageContent>} />
        <Route exact path='/library/shared' element={<PageContent><Shared /></PageContent>} />
        <Route exact path='/community' element={<PageContent><Community /></PageContent>} />
        <Route exact path='/community/playlist/:playlistID' element={<PageContent><PostPlaylist /></PageContent>} />
        <Route exact path='/albums' element={<PageContent><Albums /></PageContent>} />
        <Route exact path='/playlists/:name' element={<PageContent><PlaylistDisplay /></PageContent>} />
        <Route exact path='/library/myPlaylist' element={<PageContent><MyPlaylist /></PageContent>} />
        <Route exact path='/library/myPlaylist/create' element={<PageContent><SongsDisplay /></PageContent>} />
        <Route exact path='/library/myPlaylist/:id' element={<PageContent><SongsDisplay /></PageContent>} />
        <Route exact path='/user' element={<PageContent><User /></PageContent>} />
      </Routes>
    </div>
  );
}

export default App;
