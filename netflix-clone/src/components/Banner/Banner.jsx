import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(requests.fetchNetflixOriginals)
  //     .then((response) => {
  //       console.log(response);
  //       setMovie(
  //         response.data.results[
  //           Math.floor(Math.random() * response.data.results.length)
  //         ]
  //       );
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/discover/tv?api_key=8275b641311844ceb0b0822b7641183e&with_networks=213"
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       setMovie(
  //         response.results[Math.floor(Math.random() * response.results.length)]
  //       );
  //     });
  // }, []);

  // function truncate(str, n) {
  //   return str?.length > n ? str.slice(0, n - 1) + "..." : str;
  // }

  function truncate(str, n) {
    return str?.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__fadeTop" />
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className=" banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"/>
    </div>
  );
}

export default Banner;
