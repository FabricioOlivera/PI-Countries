import "../css/Card.css";

function Card({ name, flag, continent, capital }) {
  return (
    <div className="containerCard">
      <div className="card">
        <img src={flag} alt="a" />
        <h2>{name}</h2>
        <h3>Continent: {continent}</h3>
        <h3>Capital: {capital}</h3>
      </div>
    </div>
  );
}

export default Card;
