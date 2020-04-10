import React, { useState, useEffect } from 'react';
import { BestWorst, Seasons, ShowDetails } from './';
import { Row, Col } from 'react-bootstrap';

function getShow(id) {
  return fetch(`http://localhost:3001/id/${id}`)
  .then(res => res.json())
  .then(function(data) {
    //Data returns array of objs. Sort show by Seasons prop
    data.sort((a,b) => (a.season > b.season) ? 1 : ((b.season > a.season) ? -1 : 0));
    return data;
  });
}

function Show(props) {
  const [show, setShow] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getShow(props.match.params.imdbID).then((res) => { 
      setShow(res);
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
              title={`The Office`}
              poster={`https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg`}
              seasons={show.length}
              episodes={show.length}
            />
            <hr/>
            <BestWorst
              seasons={show}
            />
          </Col>
          <Col xs={9}>
            <Seasons
              count={show.length}
              title="The Office"
              seasons={show} />
          </Col>          
        </Row>
      )}
    </div>
  );
}

export default Show;
