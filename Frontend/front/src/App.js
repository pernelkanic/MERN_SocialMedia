
import React from 'react';
import HomePage from './components/homePage/homePage'
import ProfilePage from './components/profilePage/profilePage';
import LoginPage from './components/loginPage/loginPage.js';

import {BrowserRouter , Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<HomePage/>} />
            <Route path='/profile/:userId' element={<ProfilePage/>}/>
          </Routes>
        </BrowserRouter>
      
      </header>
    </div>
  );
}

export default App;
