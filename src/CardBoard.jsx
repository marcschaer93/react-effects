import { useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";

import { CardStackArea } from "./CardStackArea";
import "./CardBoard.css";

import { useToggleState } from "./hooks/useToggleState";
import { useFetch } from "./hooks/useFetch";

const BASE_URL = `https://deckofcardsapi.com/api/deck`;

export default function CardBoard() {
  const [drawnCards, setDrawnCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // version 0
  //   useEffect(function loadDeckFromAPI() {
  //     async function fetchData() {
  //       const resp = await axios.get(`${BASE_URL}/new`);
  //       setDeck(resp.data);
  //     }
  //     fetchData();
  //   }, []);

  // version 1
  //   const data = useFetch(`${BASE_URL}/new`);
  //   const deck = data.response;
  // version 2
  const { error, response: deck } = useFetch(`${BASE_URL}/new`);

  async function drawCard() {
    try {
      const drawRes = await axios.get(
        `${BASE_URL}/${deck.deck_id}/draw/?count=1`
      );

      if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

      const card = drawRes.data.cards[0];

      setDrawnCards((prevCards) => [
        ...prevCards,
        {
          id: card.code,
          name: card.suit + " " + card.value,
          image: card.image,
          position: {
            top: Math.floor(Math.random() * 20) - 10,
            left: Math.floor(Math.random() * 20) - 10,
            rotation: Math.floor(Math.random() * 20) - 10,
          },
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  async function shuffleCards() {
    setIsLoading(true);
    try {
      await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle`);
      setDrawnCards([]);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }

  const [isDarkmode, toggleIsDarkmode] = useToggleState(false);

  const renderNewGameButtonIfEnd = () => {
    if (drawnCards.length === 52) {
      return (
        <Button variant="contained" color="success">
          New Game
        </Button>
      );
    }
  };

  return (
    <div className={`CardBoard ${isDarkmode ? "dark" : "light"}`}>
      <Button onClick={toggleIsDarkmode} variant="contained" color="success">
        {`${isDarkmode ? "Light Green!" : "Dark Green"}`}
      </Button>

      <CardStackArea isLoading={isLoading} drawnCards={drawnCards} />

      <div className="Buttons">
        <Button onClick={drawCard} variant="contained" color="success">
          Draw Card!
        </Button>
        <Button onClick={shuffleCards} variant="contained" color="success">
          Shuffle!
        </Button>
      </div>

      {renderNewGameButtonIfEnd()}
    </div>
  );
}
