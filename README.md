## Live link:

https://movie-search-app-rc56.vercel.app/


## How to Run the Project

### Installation & Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:

   ```
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## API Used

**The Movie Database (TMDB) API v3**

- **Endpoint**: https://api.themoviedb.org/3/
- **Authentication**: Bearer Token (API Key in Authorization header)
- **Key Endpoints**:
  - `GET /search/movie` - Search for movies by query
  - `GET /discover/movie` - Discover popular movies
  - `GET /movie/{id}` - Get detailed information about a specific movie

### Optional Features Implemented

- **Pagination**
- **Routing for details page**
