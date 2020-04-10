import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SearchResults } from './';

function searchImdb(title, callback) {
  fetch(`http://localhost:3001/s/${title}`)
  .then(res => res.json())
  .then(data => callback(data));
}

function Search() {

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