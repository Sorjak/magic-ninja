import { useEffect } from "react";
import './CardMessages.css';

export default function CardMessages({message, type, onClose}) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`card-messages ${type}`}>
      {message}
    </div>
  );
}