import "./room.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../components/context/SearchContext";
import { AuthContext } from "../../components/context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Room = (room) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const { data, loading, error } = useFetch(`http://localhost:5000/rooms/find/${id}?room=${room.number}`);

  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  console.log(room)

  const days = dates ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleReserve = () => {
    if (user) {
      setOpenModal(true)
    }
    else {
      navigate("/login")
    }
  }
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("Loading...") : <>
      
        <div className="roomContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="roomWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="roomTitle"></h1>
          <div className="roomAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>North Cikarang</span>
          </div>
          <span className="roomDistance">
            Excellent location – Near President University
          </span>
          <span className="roomPriceHighlight">
            Book a room and have a great day
          </span>
          <div className="roomImages">
            {photos.map((photo, i) => (
              <div className="roomImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="roomImg"
                />
              </div>
            ))}
          </div>
          <div className="roomDetails">
            <div className="roomDetailsTexts">
              <h1 className="roomTitle">{data.type}</h1>
              <p className="roomDesc">
                {data.description}
              </p>
            </div>
            <div>
            <h2>
                <b>Rp {(days * Math.floor(data.price / 30) * options.room).toLocaleString()}</b> ({days}{" "}nights)
            </h2>
            </div>
            <div className="roomDetailsPrice">
              <h1>Perfect for you!</h1>
              <span>
                Located in the real heart of North Cikarang, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>Rp {data?.price?.toLocaleString()} / month</b>
              </h2>
              <button onClick={handleReserve}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      </>
      }
      {openModal && 
        <Reserve setOpen={setOpenModal} roomId={data._id}/>
      }
    </div>
  );
};

export default Room;
