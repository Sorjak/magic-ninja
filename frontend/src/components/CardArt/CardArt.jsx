import { useState } from "react";

import './CardArt.css';
import artPlaceholder from '../../assets/upload-card-art.png';
import API from "../../services/api";

export default function CardArt({cardData, editable, onFileAdd}) {
  const api = new API();
  const [imageSrc, setImageSrc] = useState(getImageSrc());

  function getImageSrc() {
    const imageUrl = cardData?.imageUrl;
    if (imageUrl) return `${api.IMAGE_URL}/${imageUrl}`;

    return artPlaceholder;
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file.type && !file.type.startsWith('image/')) {
      console.error('File is not an image.', file.type, file);
      return;
    }

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