import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  poster: string;
  year: string;
  genre: string;
  shortDescription: string;
}

const Card = ({
  id,
  title,
  poster,
  year,
  genre,
  shortDescription,
}: CardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div
      className="flex items-center justify-center h-[450px]"
      onClick={handleClick}
    >
      <div className="group relative w-full max-w-sm rounded-2xl shadow-xl overflow-hidden cursor-pointer">
        <div>
          {poster === "https://image.tmdb.org/t/p/w500/null" ? (
            <div className="w-full h-[486px] bg-black transition-all duration-700 group-hover:scale-110 group-hover:brightness-20">
              <p className="text-white text-center py-50">No Image Available</p>
            </div>
          ) : (
            <img
              src={poster}
              alt={`${title} poster`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-20"
            />
          )}

          <div
            className="absolute inset-0 bg-transparent text-white p-6 
                       flex flex-col justify-end opacity-0 transition-opacity duration-300
                       group-hover:opacity-100"
          >
            <h3 className="text-2xl font-bold mb-2">{title}</h3>

            <p className="text-sm font-semibold mb-1">
              {year} | {genre}
            </p>

            <p className="text-xs text-gray-300 line-clamp-3">
              {shortDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
