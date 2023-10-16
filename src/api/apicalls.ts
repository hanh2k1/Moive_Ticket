const apikey = '61daca816b1ece14981e348f54b1f09a';
export const nowPlayingMovies =
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upcomingMovies =
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popularMovies =
  `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const genres =
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`;

export const baseImagePath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
export const searchMovie = (keyword) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
}
export const moviesDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
  // return `http://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&append_to_response=videos`
}
export const movieCastDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
}
export const reviews = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apikey}`
}

export const movieTrailer = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&append_to_response=videos,images`
  // return `http://api.themoviedb.org/3/movie/${id}videos?api_key=${apikey}`
}

export const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getNowPlayingMoviesList:', error);
  }
};

export const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getUpcomingMoviesList:', error);
  }
};

export const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getPopularMoviesList:', error);
  }
};

export const getGenresList = async () => {
  try {
    let response = await fetch(genres);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getGenresList:', error);
  }
};

export const getSearchList = async (textInput) => {
  try {
    let response = await fetch(searchMovie(textInput));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getSearchList:', error);
  }
};

export const getMovieDetails = async (id) => {
  try {
    let response = await fetch(moviesDetails(id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getMovieDetails:', error);
  }
};

export const getCastList = async (id) => {
  try {
    let response = await fetch(movieCastDetails(id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getCastList:', error);
  }
};

export const getReviews = async (id) => {
  try {
    let response = await fetch(reviews(id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getReviews:', error);
  }
};

export const getMovieTrailer = async (id) => {
  try {
    let response = await fetch(movieTrailer(id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Error in getTrailer:', error);
  }
}