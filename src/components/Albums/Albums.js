import React, { useState, useEffect } from "react";
import AlbumSongs from "./AlbumSongs";
import { key } from "../key";
import classes from "./Albums.module.css";
import axios from "axios";

const Albums = (props) => {
  //console.log(props.location.state.data.name, "albums props");

  const artist = props.location.state.data.name;

  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchFormHandler = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const result = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=ciara&api_key=${key}&limit=35&format=json`
      );
      //console.log(result.data.topalbums.album);
      setAlbums(result.data.topalbums.album);
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    const results = albums.filter((album) =>
      album.name.toLowerCase().includes(search)
    );

    setSearchResults(results);
  }, [search, albums]);

  const sort = () => {
    function compare(a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }
    //console.log(albums.sort(compare).reverse());
    setSearchResults(albums.sort(compare));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={searchFormHandler}
          placeholder="Search for Albums..."
          value={search}
          className={classes.SearchAlbums}
        />
        <button onClick={sort} className={classes.SortBtn}>
          sort alphabetically
        </button>
        <h1 className={classes.MainTitle}> Top Albums</h1>
      </div>

      {searchResults.map((al) => {
        return (
          <div className={classes.AlbumsCards} key={al.name}>
            <div className="row">
              <AlbumSongs album={al} artist={artist} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Albums;
