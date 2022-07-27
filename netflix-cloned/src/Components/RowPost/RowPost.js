import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import Youtube from 'react-youtube'
import { API_KEY, imageUrl } from '../../Constants/Constants'
import "./RowPost.css"
function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId, seturlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setmovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error')
    })
  }, [])
  //youtube trailer
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const handleMovie =(id)=>{
     console.log(id)
     axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(urlId){
        seturlId('')
      }else{
        seturlId(response.data.results[0])
      }
     })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'small-poster' : 'poster' }  alt='poster' src={`${imageUrl+obj.backdrop_path}`} />
          )}    
        </div>
    { urlId && <Youtube opts={opts} videoId={urlId.key} /> }   
     </div>
  )
}

export default RowPost