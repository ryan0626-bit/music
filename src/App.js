import "./App.css";
import { useState, useEffect } from "react";
import { secretKey } from "./apiSecret";
import Music from "./Music";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function App() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = async (e) => {
    e.preventDefault();
    let encodedSearch = encodeURIComponent(search);
    console.log(secretKey);
    let response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodedSearch}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": secretKey,
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    let results = await response.json();
    console.log(results.data); //this will be an array with objects like below
    setSongs(results.data);

    setSearch("");
  };
  // {
  //   "id": 1109731,
  //   "readable": true,
  //   "title": "Lose Yourself (From \"8 Mile\" Soundtrack)",
  //   "title_short": "Lose Yourself",
  //   "title_version": "(From \"8 Mile\" Soundtrack)",
  //   "link": "https://www.deezer.com/track/1109731",
  //   "duration": 326,
  //   "rank": 985755,
  //   "explicit_lyrics": true,
  //   "explicit_content_lyrics": 1,
  //   "explicit_content_cover": 0,
  //   "preview": "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
  //   "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
  //   "artist": {
  //     "id": 13,
  //     "name": "Eminem",
  //     "link": "https://www.deezer.com/artist/13",
  //     "picture": "https://api.deezer.com/artist/13/image",
  //     "picture_small": "https://cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/56x56-000000-80-0-0.jpg",
  //     "picture_medium": "https://cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/250x250-000000-80-0-0.jpg",
  //     "picture_big": "https://cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/500x500-000000-80-0-0.jpg",
  //     "picture_xl": "https://cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/1000x1000-000000-80-0-0.jpg",
  //     "tracklist": "https://api.deezer.com/artist/13/top?limit=50",
  //     "type": "artist"
  //   },
  //   "album": {
  //     "id": 119606,
  //     "title": "Curtain Call: The Hits",
  //     "cover": "https://api.deezer.com/album/119606/image",
  //     "cover_small": "https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
  //     "cover_medium": "https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
  //     "cover_big": "https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
  //     "cover_xl": "https://cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
  //     "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
  //     "tracklist": "https://api.deezer.com/album/119606/tracks",
  //     "type": "album"
  //   },
  //   "type": "track"
  // }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <Grid container style={{ flexGrow: 1 }}>
        {songs.map((song) => (
          <Grid key={song.id} item xs={12} sm={6} md={3}>
            <Music
              id={song.id}
              album={song.album.title}
              artist={song.artist.name}
              songName={song.title_short}
              image={song.album.cover_xl}
              preview={song.preview}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
