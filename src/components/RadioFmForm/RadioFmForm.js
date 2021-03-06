import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";

import RadioResults from "../RadioResults";

import "./style.css";
import Logo1 from "../Logo";
import Logo from "../../assets/video/LogoWhite.png";
import "./style.css";
import videoForward from "../../assets/video/backgroundVforward.mp4";
import video from "../../assets/video/backgroundV.mp4";


export default function RadioFmForm() {
  const [countryRadioStations, setCountryRadioStations] = useState("");
  const [radioStationGenre, setRadioStationGenre] = useState("");
  const [radioStations, setRadioStations] = useState([]);
  const [radioDisplay, setRadioDisplay] = useState(false);

  const titles = radioStations.map((radioStation) => radioStation.title);
  const genre = radioStations.map((radioStation) => radioStation.genre);


  const fmCountry = radioStations
    .filter((station) => {
      return station.genre === radioStationGenre;
    })
    .map((item) => item);

  console.log("here here");
  console.log(fmCountry);

  const getRadioStations = (countryRadioStations) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(
        `http://marxoft.co.uk/api/cuteradio/stations?country=${countryRadioStations}`
      )
      .then((response) => response.data)
      .then((data) => {
        setRadioStations(data.items);
        console.log(data);
      });
  };

  const toggleDisplay = () => {
    setRadioDisplay(!radioDisplay);
  };
/*
  useEffect(() => {
    getRadioStations();
    if (radioStationGenre === "") {
      console.log("nonono");
    } else {
      toggleDisplay();
    }
  }, [countryRadioStations, radioStationGenre]); */


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    getRadioStations(data.Country);
    setCountryRadioStations(data.Country);
    setRadioStationGenre(data.genre);
    if (radioStationGenre === "") {
      console.log("nonono");
    } else {
      toggleDisplay();
    }
  };

  /*
  useEffect(() => {
    getRadioStations();
    if (radioStationGenre === "") {
      console.log("nonono");
    } else {
      toggleDisplay();
    }
  }, [countryRadioStations]);
*/
  return !radioDisplay ? (
    <>
      <div className="blur-box"></div>
      <div className="form-handler">
        <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="country-input"
            type="text"
            placeholder="Country"
            {...register("Country", {})}
          />
          <select className="genres-select" {...register("genre")}>
            {genre
              .filter((item, index) => genre.indexOf(item) === index)
              .map((g) => (
                <option value={g}>{g}</option>
              ))}
          </select>
          <button className="submit-button" type="submit">
            TAKE ME TRIPPIN'
          </button>
        </form>
      </div>
      <div className="background-mp">
        <div className="video-backwards">
          <video className="background-video" autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className="logo-space">
            <img className="logo" src={Logo} alt="Logo" />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      <RadioResults
        fmCountry={fmCountry}
        fmCountryRadioStations={countryRadioStations}
        fmRadioStationGenre={radioStationGenre}
        toggleDisplay={toggleDisplay}
        setCountryRadioStations={setCountryRadioStations}
        setRadioStationGenre={setRadioStationGenre}
        setRadioStations={setRadioStations}
        radioStations={radioStations}
        CountryRadioStations={countryRadioStations}
        radioStationGenre={radioStationGenre}
      />

      <video className="background-video" autoPlay loop muted>
        <source src={videoForward} type="video/mp4" />
      </video>
    </div>
  );
}
