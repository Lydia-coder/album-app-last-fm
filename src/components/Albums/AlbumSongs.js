import React, { useState, useEffect } from "react";
import classes from "./Albums.module.css";
import { key } from "../key";
import axios from "axios";

const RenderCard = function (props, classes, songs, date) {
  // child component to render cards
  const name = props.album.name;
  const image = props.album.image;

  return songs.length > 5 ? (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front ">
          <img
            className={classes.CardImgTop}
            alt="Album img"
            src={image[3]["#text"]}
          />
          <h5 className={classes.CardTitle}>{name}</h5>
          <p className={classes.CardDate}>
            {date && date.published
              ? date && date.published
              : "no date available"}
          </p>
        </div>

        <div className="flip-card-back">
          {songs.map((song, index) => {
            return (
              <ul className={classes.AlbumPlaylist} key={index}>
                <li className={classes.AlbumRank}>
                  {song["@attr"].rank} ) {song.name}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

const AlbumSongs = (props) => {
  // components to fetch songs of each album
  const album = props.album.name;
  const artist = props.artist;

  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState({});

  useEffect(() => {
    const fetchSongs = async () => {
      const result = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&getTopTracks&api_key=${key}&artist=${artist}&album=${album}&format=json`
      );

      //console.log(result.data.album, "object albums");
      //console.log(result.data.album.tracks.track, "array tracks");
      //setSongs(result.data.album.tracks.track);

      setSongs(result?.data?.album?.tracks?.track);
      setDate(result.data.album.wiki);
    };

    fetchSongs();
  }, [album, artist]);

  return <div>{RenderCard(props, classes, songs, date)}</div>;
};

export default AlbumSongs;
