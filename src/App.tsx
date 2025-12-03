import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import "./styles.css";
import MovieDetails from "./pages/MovieDetails";
import AllMoviesPage from "./pages/AllMoviesPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="text-center bg-black text-white font-bold p-4 flex justify-center">
        <Link to="/" className="m-4 p-2  hover:text-amber-500 ">
          Search Movies
        </Link>
        <Link to="/all" className="m-4 p-2 hover:text-amber-500 ">
          All Movies
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/all" element={<AllMoviesPage />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="/*" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
