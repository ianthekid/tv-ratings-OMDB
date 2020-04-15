import React, { useState, useEffect } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';

function getShow(tconst) {
  return fetch(`http://localhost:3001/show/${tconst}`)
  .then(res => res.json())
  .then(function(response) {
    //Data returns array of objs. Sort show by Seasons prop
    //response.data.sort((a,b) => (a.season > b.season) ? 1 : ((b.season > a.season) ? -1 : 0));
    return response;
  });
}

function Show(props) {
  const [show, setShow] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getShow(props.match.params.imdbID)
    .then((res) => { 
      setShow(res);
      //setSeasons(res.data);
      setLoading(false);
    })
  }, [props]);

  return (
    <div className="p-3">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row>
          <Col lg={2} md={3} sm={4}>
            <ShowDetails
              year={show.year}
              title={show.Title}
              poster={show.Poster}
              imdbID={show.imdbID}
              imdbVotes={show.imdbVotes}
              imdbRating={show.imdbRating}
            />
            <BestWorst seasons={allSeasons} />
          </Col>
          <Col lg={10} md={9} sm={8} id="ratings" className="pl-4">
            <Seasons
              count={show.totalSeasons}
              tconst={show.imdbID}
              handleAllSeasons={setAllSeasons}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Show;
