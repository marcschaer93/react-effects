export default function Card({ cardData, style }) {
  return (
    <div className="Card">
      <img className="Card-image" style={style} src={cardData.image} alt="" />
    </div>
  );
}
