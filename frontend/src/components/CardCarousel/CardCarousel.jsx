import { useState } from 'react'
import { useNavigate } from "react-router-dom";


import './CardCarousel.css';

import Card from '../Card/Card.jsx';

function CardsCarousel({cards}) {
  const cardWidth = 375 + 8;
  const [translation, setTranslation] = useState(0);
  const [currentIdx, setCurrent] = useState(0);
  const cardList = Object.values(cards);
  const cardComponents = cardList.map(card =>
    <Card incomingCard={card} key={card.id} editable={false} />
  );

  function scrollLeft() {
    let nextIdx = Math.max(0, currentIdx - 1);
    if (currentIdx != nextIdx) {
      setCurrent(nextIdx);
      moveCarousel(1);
    }
  }

  function scrollRight() {
    let nextIdx = Math.min(cardList.length - 1, currentIdx + 1);
    if (currentIdx != nextIdx) {
      setCurrent(nextIdx);
      moveCarousel(-1);
    }
  }

  function moveCarousel(dir) {
      let move = translation + (cardWidth * dir);
      const carousel = document.querySelector('.carousel');
      carousel.style.transform = `translateX(${move}px)`;
      setTranslation(move);
  }

  return (
    <>
    <div className="carousel-wrapper">
        <div className="carousel">
          {cardComponents}
        </div>
    </div>
    <div className="card-list-info">
      <button className="arrow left-arrow" id="prevBtn" onClick={scrollLeft}>&#8592;</button>
      <div className="card-count">{currentIdx + 1} / {Object.keys(cards).length}</div>
      <button className="arrow right-arrow" id="nextBtn" onClick={scrollRight}>&#8594;</button>
    </div>
    </>
  )
}


export default CardsCarousel


