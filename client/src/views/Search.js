import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SearchResults } from './';

function searchImdb(title, callback) {
  return fetch(`http://localhost:3001/s/${title}`)
  .then(res => res.json())
  .then(function(data) {
    return callback(data);
  });
}

function Search() {
/*
  var test = [
    { id: 'tt0386676', t: 'the office' },
    { id: 'tt0096697', t: 'simpsons' },
    { id: 'tt0472954', t: 'always sunny' },
    { id: 'tt0903747', t: 'breaking bad' },
    { id: 'tt0112167', t: 'sliders' },
  ]
  {(test) &&
    test.map((t) => (
      <p>
        <Link to={`/show/${t.id}`}>
          {t.t}
        </Link>
      </p>
    ))
  }
*/
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [totalResults, setTotal] = useState(0);

  function handleChange(e){
    setSearch(e.target.value)
  }

  function handleSearch() {
    searchImdb(search, (res) => {
      setResults(res.Search)
      setTotal(res.totalResults)
    })
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="showTitle">
          <Form.Label>Search for TV Show</Form.Label>
          <Form.Control type="text" placeholder="example: The Office" onChange={handleChange} />
        </Form.Group>
        <Button onClick={handleSearch}>Submit</Button>
      </Form>
      {(totalResults > 0) &&
        <SearchResults 
          shows={results}
          results={totalResults} 
        />
      }
    </div>
  );
}

export default Search;
