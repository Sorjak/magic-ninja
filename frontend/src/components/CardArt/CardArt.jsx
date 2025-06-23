import { useState } from "react";

import './CardArt.css';

export default function CardArt({cardData, editable, onFileAdd}) {
  const [imageSrc, setImageSrc] = useState(getServerImageUrl(cardData));

  function getServerImageUrl(data) {
    let imageUrl = data?.imageUrl;
    if (!imageUrl) return null;

    return `http://localhost:3000/images/${imageUrl}`;
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file.type && !file.type.startsWith('image/')) {
      console.error('File is not an image.', file.type, file);
      return;
    }

    // let formData = new FormData();
    // let fileExt = file.name.split('.').pop();

    // formData.append('imageFile', file, `${uploadId}.${fileExt}`);
    // console.log(formData.get('imageFile'));
    //Make a request to server and send formData
    // let newCard = await api.uploadFile(formData);
    // setCardData(newCard);
    let url = URL.createObjectURL(file);
    setImageSrc(url);
    onFileAdd(file);
  }

  return (
      <div className="card-art">
        { editable && <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg"/> }
        <img src={imageSrc} />
      </div>
  )
}