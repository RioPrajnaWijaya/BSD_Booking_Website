import "./propertyList.css";
import useFetch from "../../hooks/useFetch.js";

const PropertyList = () => {

  const { data, loading, error } = useFetch("http://localhost:5000/rooms/countByType?type=Single Bed,Double Bed,Exclusive Bed")

  return (
    <div className="pList">
      {loading ? (
        "Loading please wait"
        ) : 
        <>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Single Bed</h1>
          <h2>{data[0]} rooms</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Double Bed</h1>
          <h2>{data[1]} rooms</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Exlusive Bed</h1>
          <h2>{data[2]} rooms</h2>
        </div>
      </div>
      </>}
    </div>
  );
};

export default PropertyList;
