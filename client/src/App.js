import { Route, Routes, Link} from 'react-router-dom';
import { useState } from 'react'; 
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage/Home';
import PageContent from './pages/HomePage/PageContent';
import Artists from './pages/HomePage/Artists';
import RecentPlayed from './pages/HomePage/RecentPlayed';
import Favourite from './pages/HomePage/Favourites';
import MyPlaylist from './pages/HomePage/MyPlaylist';
import AboutUs from './pages/HomePage/AboutUs';
import Search from './pages/HomePage/Search';
import Playlists from './pages/HomePage/Playlists';
import './css/App.css';


import SongsDisplay from './pages/HomePage/SongsDisplay';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/home' element={<PageContent><Home /></PageContent>} />
        <Route exact path='/search' element={<PageContent><Search /></PageContent>} />
        <Route exact path='/artists' element={<PageContent><Artists /></PageContent>} />
        <Route exact path='/library' element={<PageContent><MyPlaylist /></PageContent>} />
        <Route exact path='/library/recent' element={<PageContent><RecentPlayed /></PageContent>} />
        <Route exact path='/library/favourite' element={<PageContent><Favourite /></PageContent>} />
        <Route exact path='/aboutus' element={<PageContent><AboutUs /></PageContent>} />
        <Route exact path='/playlists' element={<PageContent><Playlists /></PageContent>} />
        <Route exact path='/library/myPlaylist' element={<PageContent><MyPlaylist /></PageContent>} />
        <Route exact path='/library/myPlaylist/create' element={<PageContent><SongsDisplay /></PageContent>} />
        <Route exact path='/library/myPlaylist/:name' element={<PageContent><SongsDisplay /></PageContent>} />
      </Routes>
    </div>
  );
}

export default App;
