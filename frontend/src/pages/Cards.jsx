import { useEffect, useState  } from 'react'
import API from '../services/api.js';

import CardCarousel from '../components/CardCarousel/CardCarousel.jsx';

function Cards() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const api = new API();

  useEffect(() => {
    async function fetchData() {
      setData(await api.fetchData('cards'));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div id="carousel-page" className="page">
        { !loading && <CardCarousel cards={data} /> }
    </div>
  )
}

export default Cards