import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

function ShowDetails(props) {

  const [data, setData] = useState({});

  useEffect(() => {
    setData( props )
  }, [props]);

  return (
    <Col>
      <Row>
        <Image fluid src={data.poster} />
      </Row>
      <Row><h2>{data.title}</h2></Row>
      <Row>{data.year}</Row>
      <Row>{data.imdbRating} ({data.imdbVotes})</Row>
    </Col>
  );
}

export default ShowDetails;