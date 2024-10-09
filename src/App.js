import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/assets/Search';
import Movie from './pages/Movie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'></Route>
        <Route path='/Search' element={<Search />}></Route>
        <Route path='/Movie' element={<Movie />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
