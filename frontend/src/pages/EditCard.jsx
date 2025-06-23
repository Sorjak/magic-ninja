import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// import EditCard from '../components/EditCard.jsx';
import API from '../services/api.js';
import Card from '../components/Card/Card.jsx';

function EditExistingCard() {
  const api = new API();
  const { cardId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setData(await api.fetchData(`cards/${cardId}`));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div id="card-detail-page" className="page">
      { !loading && <Card cardId={cardId} incomingCard={data} /> }
    </div>
  )
}

export default EditExistingCard