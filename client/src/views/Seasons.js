import React from 'react';
import Episode from './Episode';
import { Row, Col } from 'react-bootstrap';

function Seasons(props) {
  return (
    <Row>
      {props.seasons.map((s,index) => (
        <Col key={index}>
          <strong>{s.season}</strong>
          {s.episodes.map((e,i) => (
            <Episode
              key={i}
              title={e.Title}
              imdb={e.imdbID}
              rating={e.imdbRating}
              id={`S${s.season}E${e.Episode}`}
            />
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default Seasons;