import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/movie/:imdbID' element={<Movie />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
