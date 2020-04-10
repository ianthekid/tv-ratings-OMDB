import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { List } from './';

function sortedEps(seasons, cb) {
  var show = [];
  seasons.map(s => {
    s.episodes.map(e => show.push(e))
  })
  show.sort((a, b) => parseFloat(a.imdbRating) - parseFloat(b.imdbRating));
  return cb(show);
}

function BestWorst(props) {

  const [best, setBest] = useState([]);
  const [worst, setworst] = useState([]);

  useEffect(() => {
    sortedEps(props.seasons, (res) => { 
      setBest( res.slice(-3).reverse() )
      setworst( res.slice(0, 3) )
    });
  }, [props]);

  return (
    <div className="text-left mt-4 mb-5 ml-3">
      <h6>Best Episodes</h6>
      <Row>
        {(best.length > 0) &&  <List episodes={best} />}
      </Row>
      <h6 className="mt-3">Worst Episodes</h6>
      <Row>
        {(worst.length > 0) && <List episodes={worst} />}
      </Row>
    </div>
  );
}

export default BestWorst;