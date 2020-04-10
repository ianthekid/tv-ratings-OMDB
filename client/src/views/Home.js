import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Home() {

  const [query, setQuery] = useState('');
  const history = useHistory();

  function handleChange(e){
    setQuery(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/search/${query}`)
  }

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="showTitle">
          <Form.Label>Search for TV Show</Form.Label>
          <Form.Control type="text" placeholder="example: The Office" onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Home;