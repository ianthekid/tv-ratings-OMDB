import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

function List(props) {

  const [list, setList] = useState([]);

  useEffect(() => {
    setList( props.episodes )
  }, [props]);

  return (
    <Col>
      {list.map((ep, i) => (
        <Row key={i}>
          <Col xs={3}>{ep.imdbRating}</Col>
          <Col className="text-left">{ep.Title}</Col>
        </Row>
      ))}
    </Col>
  );
}

export default List;