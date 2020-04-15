import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { SearchResults } from './';
import { SearchForm } from './';

function searchImdb(title, callback) {
  fetch(`http://localhost:3001/s/${encodeURIComponent(title)}`)
  .then(res => res.json())
  .then(data => callback(data));
}

function Search(props) {

  const history = useHistory();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  function handleChange(input){
    setSearch(input)
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/search/${search}`)
  }

  const handleQuery = useCallback((q) => {
    //Reset data
    setSearch('')
    setQuery(q)
    setError(false)
    setLoading(true)
    setTotal(0)
    setResults([])

    searchImdb(q, (res) => {
      if(res.Response === "False") {
        setError(true)
      } else {
        setError(false)
        setResults(res.Search)
        setTotal(res.totalResults)  
      }
      setLoading(false);
    })  
  }, []);
  
  useEffect(() => {
    handleQuery(props.match.params.query)
  }, [ props.match.params.query ]) 

  return (
    <Container>
      <SearchForm
        handleSearch={handleSearch}
        handleChange={handleChange}
        search={search}
      />
      {(isLoading) &&
        <div>Searching ...</div>
      }
      {(error) &&
        <Alert variant="danger">
          No Results Found
        </Alert>
      }
      {(totalResults > 0) &&
        <Row>
          <Col className="text-left">Search results for "{query}"</Col>
        </Row>
      }
      {(totalResults > 0) &&
        <SearchResults 
          shows={results}
          results={totalResults} 
        />
      }
    </Container>
  );
}

export default Search;