import React from 'react';
import './Pokemon.css';
import {Link} from 'react-router-dom';

function Pokemon({name, id, types, url}) {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
      <div>
        <img className='pokemon_image' src={url} />
      </div>
      <div className='pokemon_name'>{name}</div>
      </Link>
    </div>
  )
}

export default Pokemon;

