import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';

function App() {
  const  user  = useSelector(state => state.authReducer.authData);

  return (
    <div className="overflow-hidden text-black bg-[#f3f3f3] p-4">
      <div className="absolute w-[22rem] h-[14rem] rounded-[50%] blur-[72px] bg-[#a6ddf0] -top-[18%] right-0"></div>
      <div className="absolute w-[22rem] h-[14rem] rounded-[50%] blur-[72px] bg-[#a6ddf0] top-[36%] -left-32"></div>
      <Routes>
        <Route 
          path='/'
          element={user ? <Navigate to='home' /> : <Navigate to='auth' />}
        />
        <Route 
           path='home'
           element={user ? <Home /> : <Navigate to='../auth' />}
        />
        <Route 
          path='auth'
          element={user ? <Navigate to='../home' /> : <Auth />}
        />
        <Route 
          path='profile/:id'
          element={user ? <Profile /> : <Navigate to='../auth' />}
        />
      </Routes>
    </div>
  );
}

export default App;
