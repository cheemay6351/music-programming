import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Searcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
  
    const access_token = props.token
    
    const searchArtist = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
      
        var artistID = data.artists.items[0].id

        var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                limit: 10,
                market: 'US'
            }
        })

        setTracks(artistTracks.data.tracks);
    }

    return (
      <>
      <div className="SearchForm">
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Artist Name ..."
          onChange={(e) => {setSearchKey(e.target.value)}}
          
          />
        <button onClick={searchArtist}>Search</button> 
      </div>
      {
        tracks.slice(0, 5).map(track => (
            <div key={track.id} >
                <ul>
                    <li > {track.name}</li>
                </ul>
            </div>
        ))
      }
      </> 
    )
}

export default Searcher