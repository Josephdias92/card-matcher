import React, { useState } from "react";
import "./App.css";

// Expanded emoji list with more emojis
const emojiList = [
  "🍎",
  "🍌",
  "🍇",
  "🍓",
  "🍍",
  "🍒",
  "🥝",
  "🍉",
  "🍋",
  "🍊",
  "🍏",
  "🍐",
  "🍑",
  "🍈",
  "🥭",
  "🍔",
  "🍟",
  "🌭",
  "🍕",
  "🍩",
  "🍪",
  "🍫",
  "🍿",
  "🍖",
  "🍗",
  "🥩",
  "🥗",
  "🍤",
  "🍣",
  "🍱",
  "🍛",
  "🍜",
  "🍝",
  "🍲",
  "🍥",
  "🍡",
  "🍢",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🍰",
  "🎂",
  "🍮",
  "🍯",
  "☕",
  "🍵",
  "🥤",
  "🧃",
  "🍶",
  "🍺",
  "🍻",
  "🥂",
  "🍷",
  "🥃",
  "🍸",
  "🍹",
  "🍾",
  "🧊",
  "🍴",
  "🥄",
  "🔪",
  "🍽",
  "🧂",
  "🍳",
  "🥓",
  "🧀",
  "🥚",
  "🍔",
  "🌮",
  "🌯",
  "🥙",
  "🍖",
  "🍗",
  "🍤",
  "🍣",
  "🍛",
  "🍜",
  "🍝",
  "🍲",
  "🍥",
  "🍡",
  "🍢",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🍰",
  "🎂",
  "🍮",
  "🍯",
  "☕",
  "🍵",
  "🥤",
  "🧃",
  "🍶",
];

function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState(generateCards(difficulty));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0); // Track correct matches
  const [penalty, setPenalty] = useState(0); // Track incorrect matches
  const [totalAttempts, setTotalAttempts] = useState(0); // Track total attempts

  function shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  function generateCards(difficulty: string) {
    let numCards;
    if (difficulty === "easy") numCards = 16; // Default to 16 cards for easy
    else if (difficulty === "medium") numCards = 36; // 36 cards for medium
    else numCards = 64; // 64 cards for hard

    const selectedEmojis = emojiList.slice(0, numCards / 2);
    const cardsArray = shuffleArray([...selectedEmojis, ...selectedEmojis]); // Duplicate emojis programmatically
    return cardsArray.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
  }

  const handleDifficultyChange = (level: string) => {
    setDifficulty(level);
    setCards(generateCards(level));
    setFlippedCards([]);
    setScore(0); // Reset score
    setPenalty(0); // Reset penalty
    setTotalAttempts(0); // Reset attempts
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].flipped || cards[id].matched) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );

    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => checkMatch(newFlippedCards), 1000);
    }
  };

  const checkMatch = (flipped: number[]) => {
    const [first, second] = flipped;
    const newCards = [...cards];
    setTotalAttempts((prevAttempts) => prevAttempts + 1); // Increment attempts

    if (newCards[first].emoji === newCards[second].emoji) {
      newCards[first].matched = true;
      newCards[second].matched = true;
      setScore((prevScore) => prevScore + 1); // Increment score on match
    } else {
      newCards[first].flipped = false;
      newCards[second].flipped = false;
      setPenalty((prevPenalty) => prevPenalty + 1); // Increment penalty on mismatch
    }

    setCards(newCards);
    setFlippedCards([]);
  };

  return (
    <div className="App">
      <h1>Emoji Card Matching Game</h1>
      <div className="scoreboard">
        <div>Score: {score}</div> {/* Display score */}
        <div>Penalties: {penalty}</div> {/* Display penalties */}
        <div>Total Attempts: {totalAttempts}</div>{" "}
        {/* Display total attempts */}
      </div>
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
        <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
      </div>
      <div className={`card-grid ${difficulty}`}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">{card.emoji}</div>
              <div className="card-back">❓</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
