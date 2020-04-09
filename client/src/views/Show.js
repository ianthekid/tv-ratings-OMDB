import React, { useState, useEffect } from 'react';
import Seasons from './Seasons';
import BestWorst from './BestWorst';

function getShow(id) {
  return fetch(`http://localhost:3001/id/${id}`)
  .then(res => res.json())
  .then(function(data) {
    //Data returns array of objs. Sort show by Seasons prop
    data.sort((a,b) => (a.season > b.season) ? 1 : ((b.season > a.season) ? -1 : 0));
    return data;
  });
}

function Show() {
  const [show, setShow] = useState([]);

  useEffect(() => {
    getShow('tt0112167').then((res) => { setShow(res); })
  }, []);

//office tt0386676
//simpsons tt0096697
//always tt0472954
//bb tt0903747
//sliders tt0112167

  return (
    <div>
      <h2>Number of Seasons: {show.length}</h2>
      {(show) &&
        <div>
          <Seasons
            count={show.length}
            title="The Office"
            seasons={show} />

          <BestWorst
            seasons={show}
          />
        </div>
      }
    </div>
  );
}

export default Show;
