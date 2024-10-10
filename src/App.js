import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Search' element={<Search />}></Route>
        <Route path='/Movie' element={<Movie />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
