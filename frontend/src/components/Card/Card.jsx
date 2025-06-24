import { useState, useEffect } from 'react'
import './Card.css'

import API from '../../services/api.js';
import CardActions from '../CardActions/CardActions.jsx';
import CardArt from '../CardArt/CardArt.jsx';

function Card({cardId=null, incomingCard=null, editable=true}) {
  const api = new API()

  const isNewCard = incomingCard == null;
  const [cardData, setCardData] = useState(incomingCard);
  const [imageFile, setImageFile] = useState(null);

  // This fires when the component loads. 
  // Fetch card data from the server if we were only given an ID.
  useEffect(() => {
    async function getCardData() {
      setCardData(await api.fetchData(`cards/${cardId}`));
    }

    if (incomingCard == null && cardId != null) { 
      getCardData();
    }
  }, []);

  function updateCardField(key, value) {
    let clone = structuredClone(cardData) || {};
    clone[key] = value;
    setCardData(clone);
  }

  function handleOnChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    updateCardField(key, value);
  }

  function fileAdded(file) {
    if (cardData?.id) {
      let filename = file.name.split('.').pop();
      updateCardField('imageUrl', `${cardData.id}.${filename}`);
    }
    setImageFile(file);
  }
  
  return (
    <div className="card-container">
      <div className={editable ? "card editing" : "card"}>
        <div className="card-top">
          <input type="text" className="card-name" name="name" placeholder="Card Name" 
            defaultValue={cardData?.name} readOnly={!editable} onChange={e => handleOnChange(e)}/> 
          <input type="number" className="mana-cost" name="cost" placeholder="Cost"
            defaultValue={cardData?.cost} readOnly={!editable} onChange={e => handleOnChange(e)}/> 
        </div>

        <CardArt cardData={cardData} editable={editable} onFileAdd={fileAdded}/>

        <input type="text" className="card-type" name="type" placeholder="Conjuration - Fire"
          defaultValue={cardData?.type} readOnly={!editable} onChange={e => handleOnChange(e)}/> 

        <textarea className="rules-text" name="rules" placeholder="Rules text..." 
          defaultValue={cardData?.rules} readOnly={!editable} onChange={e => handleOnChange(e)}/> 

        <textarea className="flavor-text" name="flavor" placeholder="Flavor text..." 
          defaultValue={cardData?.flavor} readOnly={!editable} onChange={e => handleOnChange(e)}/>
      
        <CardActions
          cardData={cardData}
          imageFile={imageFile}
          save={isNewCard && editable} 
          update={!isNewCard && editable}
          del={!isNewCard && editable}
          edit={!editable} 
        />
        
      </div>
    </div>
  )
}

export default Card
