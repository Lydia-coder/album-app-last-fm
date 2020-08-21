import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { key } from "../key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import classes from "./Artist.module.css";

const Artist = () => {
  const [artist, setArtist] = useState([]);
  useEffect(() => {
    const fetchArtist = async () => {
      const resultArtist = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Ciara&api_key=${key}&format=json`
      );
      console.log(resultArtist.data.artist);
      setArtist([resultArtist.data.artist]);
    };

    fetchArtist();
  }, []);

  return (
    <div>
      {console.log(artist)}
      {artist.map((ar, index) => {
        return (
          <div key={index}>
            <section className="section parallax bg1">
              <h1 className={classes.ArtistTitle}>{ar.name}</h1>
              <FontAwesomeIcon
                icon={faArrowDown}
                className={classes.Arrow}
              />{" "}
            </section>

            <section className="section static">
              <p className={classes.ArtistContent}>
                {ar.bio.summary.substring(0, 484)}
              </p>
            </section>
            <section className="section parallax bg2">
              <Link
                to={{
                  pathname: "/albums",
                  state: { data: ar },
                }}
              >
                <button className={classes.AlbumsBtn}>albums</button>
              </Link>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Artist;
