import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import List from './List';

function sortedEps(seasons, cb) {
  var show = [];
  seasons.map((s) => {
    s.episodes.map((e) => {
      show.push(e)
    })
  })
  show.sort((a, b) => parseFloat(a.imdbRating) - parseFloat(b.imdbRating));
  return cb(show);
}

function BestWorst(props) {

  const [show, setShow] = useState([]);
  const [best, setBest] = useState([]);
  const [worst, setworst] = useState([]);

  useEffect(() => {
    sortedEps(props.seasons, (res) => { 
      setShow(res);
      setBest( res.slice(-3).reverse() )
      setworst( res.slice(0, 3) )
    });
  }, [props]);

  return (
    <Container>
      <h3>Best</h3>
      <Row>
        {(best.length > 0) && 
          <List episodes={best} /> 
        }
      </Row>
      <h3>Worst</h3>
      <Row>
        {(worst.length > 0) && 
          <List episodes={worst} /> 
        }
      </Row>
    </Container>
  );
}

export default BestWorst;