import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const MovieDetails = () => {
  const { id } = useParams<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMovie = async (id: string) => {
      setLoading(true);

      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data: Movie = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setMovieData(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      searchMovie(id);
    }
  }, [id]);
  const {
    title,
    poster_path,
    release_date,
    overview,
    genres = [],
    vote_average,
    popularity,
  } = movieData || {};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-12 w-12 border-4 border-amber-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!movieData && !loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl text-gray-600">Movie not found.</p>
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-amber-500 underline hover:cursor-pointer "
          >
            Back to search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto max-w-6xl">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-amber-500 hover:underline hover:cursor-pointer "
        >
          &larr; Back
        </button>
      </div>

      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden
                   flex flex-col md:flex-row items-stretch gap-6
                   border border-gray-200"
      >
        <div className="md:w-1/3 w-full bg-gray-100 flex items-center justify-center">
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              className="object-fit w-full h-4/5 md:h-96"
            />
          ) : (
            <div className="w-full h-64 md:h-96 flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <span>
                Release:{" "}
                <span className="font-medium text-gray-900">
                  {release_date || "N/A"}
                </span>
              </span>
              <span>
                Rating:{" "}
                <span className="font-medium text-gray-900">
                  {vote_average ?? "—"}
                </span>
              </span>
              <span>
                Popularity:{" "}
                <span className="font-medium text-gray-900">
                  {Math.round(popularity || 0)}
                </span>
              </span>
              <span className="flex items-center gap-1">
                Genres:
                <span className="font-medium text-gray-900">
                  {genres.length ? genres.map((g) => g.name).join(", ") : "N/A"}
                </span>
              </span>
            </div>

            <div className="text-gray-800 text-justify leading-relaxed">
              <h2 className="font-semibold mb-2">Overview</h2>
              <p>{overview || "No overview available."}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-block px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors hover:cursor-pointer"
            >
              Back to list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
