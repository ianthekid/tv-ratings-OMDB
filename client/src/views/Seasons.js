import React from 'react';
import { Episode } from './';
import { Row, Col } from 'react-bootstrap';

function Seasons(props) {
  return (
    <Row>
      {props.seasons.map((s,index) => (
        <Col xs={1} key={index} className="mr-1 p-0">
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