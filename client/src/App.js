import { Route, Routes, Link} from 'react-router-dom';
import { useState } from 'react'; 
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/HomePage/Home';
import PageContent from './pages/HomePage/PageContent';
import Artists from './pages/HomePage/Artists';
import RecentPlayed from './pages/HomePage/RecentPlayed';
import Favourite from './pages/HomePage/Favourites';
import CreatePlaylist from './pages/HomePage/CreatePlaylist';
import AboutUs from './pages/HomePage/AboutUs';
import Search from './pages/HomePage/Search';
import './css/App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/home' element={<PageContent><Home /></PageContent>} />
        <Route exact path='/home/search' element={<PageContent><Search /></PageContent>} />
        <Route exact path='/home/artists' element={<PageContent><Artists /></PageContent>} />
        <Route exact path='/home/recent' element={<PageContent><RecentPlayed /></PageContent>} />
        <Route exact path='/home/favourite' element={<PageContent><Favourite /></PageContent>} />
        <Route exact path='/home/aboutus' element={<PageContent><AboutUs /></PageContent>} />
        <Route exact path='/home/createPlaylist' element={<PageContent><CreatePlaylist /></PageContent>} />
      </Routes>
    </div>
  );
}

export default App;
