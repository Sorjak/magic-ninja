import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import API from '../../services/api.js';

import './CardActions.css';

export default function CardActions({cardData, imageFile, save, update, del, edit}) {
  const api = new API()
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // CRUD functions to create, update and delete cards.
  async function createCard() {
    if (cardData == null || loading) return;

    setLoading(true);
    let json_body = JSON.stringify(cardData);
    let newCard = await api.pushData('cards', 'POST', json_body);

    // Now that we have a card ID, upload and associate the image.
    if (imageFile) await uploadImage(newCard.id);

    showMessage('Card created!');
    setLoading(false);
    navigate('/cards');
  }

  async function updateCard() {
    if (cardData == null || loading) return;
    let cardId = cardData.id;

    setLoading(true);
    // If the image changed at all, upload it first.
    if (imageFile) await uploadImage(cardId);

    let json_body = JSON.stringify(cardData);
    await api.pushData(`cards/${cardData.id}`, 'PUT', json_body);
    showMessage('Card updated!');
    setLoading(false);
  } 

  async function deleteCard() {
    if (cardData == null || loading) return;

    setLoading(true);
    await api.pushData(`cards/${cardData.id}`, 'DELETE', null);
    showMessage('Card deleted!');
    setLoading(false);
    
    // navigate back to home, this card no longer exists.
    navigate('/cards');
  }

  async function editCard() {
    if (!cardData.id) return;

    navigate(`/card/${cardData.id}`)
  }

  async function uploadImage(uploadId) {
    if (!uploadId) return;

    let formData = new FormData();
    let fileExt = imageFile.name.split('.').pop();

    formData.append('imageFile', imageFile, `${uploadId}.${fileExt}`);

    await api.uploadFile(formData);
  }

  function showMessage(message) {
    toast(message);
  }

  return (
    <div className={`card-actions ${loading ? 'loading' : ''}`}>
        { save && <button className="card-button save-button" onClick={createCard}>Create Card</button> }
        { update && <button className="card-button update-button" onClick={updateCard}>Update Card</button> }
        { del && <button className="card-button delete-button" onClick={deleteCard}>Delete Card</button> }
        { edit && <button className="card-button edit-button" onClick={editCard}>Edit Card</button> }
    </div>
  )
}