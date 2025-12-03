import { useState } from "react";
import Card from "../components/Card";
import getGenreName from "../utils/getGenreName";
import type Movie from "../interfaces/MovieInterface";

function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async (query: string) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to Search for movies");
      }
      const allMovies = await response.json();
      const results: Movie[] = allMovies.results;
      console.log(allMovies);

      setMovies(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const query = formData.get("search");
      if (typeof query !== "string" || !query.trim()) return;
      searchMovies(query.trim());
    }
  };

  return (
    <>
      <form className="mt-10 mx-auto w-11/12 md:w-1/3" onSubmit={onSearch}>
        <label className="block mb-2 font-medium text-center" htmlFor="search">
          Movies Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Search for movies..."
        />
        <button
          type="submit"
          className="block mb-2 font-medium mt-4 w-full cursor-pointer bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
      {hasSearched && !loading && movies.length === 0 && (
        <p className="text-center mt-10 text-3xl text-red-700 font-bold">
          No movies found with this name.
        </p>
      )}
      {!hasSearched && !loading && (
        <p className="text-center mt-10 text-3xl text-amber-700 font-bold">
          Let’s start, make a search 🚀
        </p>
      )}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="h-12 w-12 border-4 border-amber-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-11/12 justify-center my-10 mx-auto">
        {movies.map((m) => {
          const genreId = m.genre_ids?.[0];

          return (
            <Card
              key={m.id}
              id={m.id}
              title={m.title}
              year={m.release_date}
              genre={genreId ? getGenreName(genreId) : "Unknown"}
              shortDescription={m.overview}
              poster={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
            />
          );
        })}
      </div>
    </>
  );
}

export default SearchPage;
