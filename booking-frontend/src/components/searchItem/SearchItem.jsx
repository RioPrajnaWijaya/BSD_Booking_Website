import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({item, room}) => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{room.number}</h1>
        <span className="siType">{item.type}</span>
        <span className="siStatus">{room.status ? "Available" : "Unavailable"}</span>
        <span className="siSize">
          {item.size}
        </span>
        <span className="siDescription">
          {item.description}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>9.0</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rp {item.price.toLocaleString()}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/rooms/${item._id}?room=${room.number}`}>
            <button className="siCheckButton">See more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
