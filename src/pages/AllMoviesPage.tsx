import { useEffect, useState } from "react";
import type Movie from "../interfaces/MovieInterface";
import getGenreName from "../utils/getGenreName";
import Card from "../components/Card";
const AllMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  useEffect(() => {
    setPageNum(1);
  }, [sortBy, includeAdult]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=${includeAdult}&include_video=false&language=en-US&page=${pageNum}&sort_by=${sortBy}`;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        const results: Movie[] = data.results;

        setMovies(results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [includeAdult, sortBy, pageNum]);

  return (
    <>
      <div className="flex justify-around p-6">
        <div>
          <label htmlFor="sortBy" className="block mb-2 font-medium">
            Sort by
          </label>
          <select
            id="sortBy"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity.desc">popularity</option>
            <option value="primary_release_date.desc">
              Release date (newest → oldest)
            </option>
            <option value="title.asc">alphabetically (asc)</option>
          </select>
        </div>

        <div className="flex items-center mt-6">
          <input
            id="active"
            type="checkbox"
            className="mr-2"
            onChange={(e) => setIncludeAdult(e.target.checked)}
          />
          <label htmlFor="active" className="font-medium">
            Include R-rated movies
          </label>
        </div>
      </div>
      <div className="flex items-center mx-auto justify-center mt-6">
        <button
          className="px-4 py-2 mx-5 text-sm rounded-md bg-black text-white hover:bg-yellow-600 cursor-pointer transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pageNum <= 1}
          onClick={() => setPageNum((num) => num - 1)}
        >
          Prev
        </button>
        <div>
          Page{" "}
          <span className="text-amber-700">
            {pageNum} / {totalPages}
          </span>
        </div>
        <button
          className="px-4 py-2 mx-5 text-sm rounded-md bg-black text-white hover:bg-yellow-600 cursor-pointer transition duration-200"
          disabled={pageNum >= totalPages}
          onClick={() => {
            setPageNum((num) => num + 1);
          }}
        >
          Next
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="h-12 w-12 border-4 border-amber-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-11/12 justify-center my-10 mx-auto">
          {movies.map((m) => {
            return (
              <Card
                key={m.id}
                id={m.id}
                title={m.title}
                year={m.release_date}
                genre={getGenreName(m.genre_ids[0])}
                shortDescription={m.overview}
                poster={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default AllMoviesPage;
