import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "./Card";
import "./Card.css";

export const CardStackArea = ({ drawnCards, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="CardStack">
          {drawnCards.map((card, index) => {
            return (
              <Card
                key={index}
                cardData={card}
                style={{
                  top: `${card.position.top}px`,
                  left: `${card.position.left}px`,
                  transform: `rotate(${card.position.rotation}deg)`,
                  zIndex: index + 1,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
