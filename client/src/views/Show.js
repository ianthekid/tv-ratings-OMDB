import React, { useState, useEffect } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';

function getShow(id) {
  return fetch(`http://localhost:3001/id/${id}`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of objs. Sort show by Seasons prop
    response.data.sort((a,b) => (a.season > b.season) ? 1 : ((b.season > a.season) ? -1 : 0));
    return response;
  });
}

function Show(props) {
  const [show, setShow] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getShow(props.match.params.imdbID).then((res) => { 
      setShow(res);
      setSeasons(res.data);
      setLoading(false);
    })
  }, [props]);

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row>
          <Col xs={3}>
            <ShowDetails
              title={show.Title}
              poster={show.Poster}
              year={show.Year}
              imdbVotes={show.imdbVotes}
              imdbRating={show.imdbRating}
            />
            <hr/>
            <BestWorst
              seasons={seasons}
            />
          </Col>
          <Col xs={9}>
            <Seasons
              count={show.totalSeasons}
              title="The Office"
              seasons={seasons} />
          </Col>          
        </Row>
      )}
    </div>
  );
}

export default Show;
