import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SearchResults(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList( props.shows )
  }, [props]);

  return (
    <Col>
      {list.map((s, i) => (
        <Row key={i} className="mb-3">
          <Col xs={2}>
            {(s.Poster != "N/A") &&
              <Image fluid src={s.Poster} />
            }
          </Col>
          <Col className="text-left">
            <h3>
              <Link to={`/show/${s.imdbID}`}>
                {s.Title}
              </Link>
            </h3>
            <h5>{s.Year}</h5>
          </Col>
        </Row>
      ))}
    </Col>
  );
}

export default SearchResults;