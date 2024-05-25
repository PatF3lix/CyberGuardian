import { useState } from "react";
import styles from "./starRating.module.scss";

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
};

export default function StarRating({
  rating,
  onRatingChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  function handleMouseEnter(index: number) {
    setHoverRating(index);
  }

  function handleMouseLeave() {
    setHoverRating(null);
  }

  function handleClick(index: number) {
    if (onRatingChange) {
      onRatingChange(index);
    }
  }

  function getStarClass(index: number) {
    if (hoverRating != null) {
      return index <= hoverRating ? "starFilled" : "starEmpty";
    }
    return index <= rating ? "starFilled" : "starEmpty";
  }

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <span
            key={index}
            className={`${styles.star} ${styles[getStarClass(index)]}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
