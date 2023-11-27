export default function Card({ cardData, style }) {
  return (
    <div className="Card">
      <img style={style} src={cardData.image} alt="" />
    </div>
  );
}
