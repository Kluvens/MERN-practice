import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/User/Profile';
import Cart from './components/ Cart/Cart';

function isUserAuthenticated() {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}

const App = () => {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowBookList isUserAuthenticated={isUserAuthenticated} />} />
          <Route path='/create-book' element={<CreateBook />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/profile/:id" element={<Profile isUserAuthenticated={isUserAuthenticated} />} />
          <Route path="/cart/:id" element={<Cart isUserAuthenticated={isUserAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;