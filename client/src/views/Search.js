import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Alert, Row, Col, Form, Button } from 'react-bootstrap';
import { SearchResults } from './';

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
  
  useEffect(() => {
    handleQuery(props.match.params.query)
  }, [ props.match.params.query ]) 

  const handleQuery = useCallback((q) => {
    searchImdb(q, (res) => {
      setSearch('')
      setQuery(q)
    if(res.Response === "False") {
        setError(true)
        setTotal(0)
        setResults([])
      } else {
        setError(false)
        setResults(res.Search)
        setTotal(res.totalResults)  
      }
    })  
  }, []);

  function handleChange(e){
    setSearch(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/search/${search}`)
  }

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs={10}>
            <Form.Group controlId="showTitle">
              <Form.Control 
                type="text" 
                onChange={handleChange}
                value={search}
                placeholder="example: The Office" />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-left">Search results for "{query}"</Col>
        </Row>
      </Form>
      {(error) &&
        <Alert variant="danger">
          No Results Found
        </Alert>
      }
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