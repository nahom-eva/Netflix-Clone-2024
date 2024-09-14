import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./modal.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]); //Stores the list of movies fetched from the API.
  const [trailerUrl, setTrailerUrl] = useState(""); //Stores the YouTube trailer URL

  const [selectedMovie, setSelectedMovie] = useState(null); //The movie clicked by the user to show in the modal.
  const [modalVisible, setModalVisible] = useState(false); // Tracks whether the modal window is visible or not.
  const [trailerAvailable, setTrailerAvailable] = useState(true); //  Tracks whether a trailer is available for the selected movie.
  const base_url = "https://image.tmdb.org/t/p/original";

  //Fetching Movie Data with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl); //fetches data from the fetchUrl prop
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [fetchUrl]); //This runs only when the fetchUrl changes, i.e., when different categories of movies are requested (e.g., Trending, Action)

  const handlePosterClick = (movie) => {
    console.log(movie);
    setSelectedMovie(movie);
    setModalVisible(true); // Open the modal
    setTrailerUrl(""); // Clear the trailer URL when opening the modal
    setTrailerAvailable(true); // Reset trailer availability when opening the modal
  };

  const handlePlayTrailerClick = () => {
    movieTrailer(
      selectedMovie?.title ||
        selectedMovie?.name ||
        selectedMovie?.original_name
    ) //This is a call to a third-party package called movie-trailer, which tries to find a YouTube trailer URL based on the movie title, name or original name.
      .then((url) => {
        console.log(url);
        const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams);
        setTrailerUrl(urlParams.get("v"));
        console.log(urlParams.get("v"));
        setTrailerAvailable(true); // Trailer is available
      }) //This is a promise function. The movieTrailer function returns a promise (an object representing a value that may not be available yet). The .then() method handles the result of the promise.

      .catch(() => {
        setTrailerAvailable(false); // Trailer not available
      }); //error-handling part of the promise chain.
  };

  const closeModal = () => {
    setModalVisible(false); // we are closing the modal
    setSelectedMovie(null); // we are clearing the selected movie data. Because When the modal is closed, there’s no need to keep the selected movie data, so this step ensures the component resets appropriately.
    setTrailerUrl(""); // By setting trailerUrl to an empty string (""), we are essentially stopping the trailer. This will remove the trailer from the modal and stop it from playing.
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1> {/* The title is passed as a prop and rendered here */}
      <div className="row__posters">
        {movies && movies.length > 0
          ? movies.map((movie) =>
              movie.backdrop_path !== null || movie.poster_path !== null ? (
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow
                      ? movie.poster_path
                      : movie.backdrop_path || movie.poster_path
                  }`}
                  onClick={() => handlePosterClick(movie)}
                />
              ) : null
            )
          : null}
      </div>
      {/* Modal Window */}
      {modalVisible && selectedMovie && (
        <div className="modal__backdrop" onClick={closeModal}>
          <div
            className="modal__content"
            onClick={(event) => event.stopPropagation()} // Prevent modal close on content click. This stopPropagation method is used to stop an event from propagating further up or down the DOM hierarchy. This can be useful when we want to prevent a parent element’s event listener(in this case "modal__backdrop") from being triggered when an event occurs on a child element.
            style={{
              backgroundImage: `url(${base_url}${selectedMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button className="modal__close" onClick={closeModal}>
              &times;
            </button>

            {/* YouTube trailer */}

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            <div className="modal__details">
              <h2>{selectedMovie.title || selectedMovie.name}</h2>
              <p>{selectedMovie.overview}</p>

              {/* Conditionally render the Play Trailer button or "Trailer not available" message */}
              {!trailerUrl && trailerAvailable && (
                <button
                  className="modal__button"
                  onClick={handlePlayTrailerClick}
                >
                  Play Trailer
                </button>
              )}
              {!trailerUrl && !trailerAvailable && (
                <p className="modal__message">Trailer not available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;
