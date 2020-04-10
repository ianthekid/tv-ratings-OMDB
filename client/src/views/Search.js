import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {

  var test = [
    { id: 'tt0386676', t: 'the office' },
    { id: 'tt0096697', t: 'simpsons' },
    { id: 'tt0472954', t: 'always sunny' },
    { id: 'tt0903747', t: 'breaking bad' },
    { id: 'tt0112167', t: 'sliders' },
  ]

  return (
    <div>
      <h2>Search for TV Show</h2>
      {(test) &&
        test.map((t) => (
          <p>
            <Link to={`/show/${t.id}`}>
              {t.t}
            </Link>
          </p>
        ))
      }
    </div>
  );
}

export default Search;
