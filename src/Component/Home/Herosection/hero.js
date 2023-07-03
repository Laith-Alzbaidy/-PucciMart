import HeroDog from "../../../Imges/doghero.png";
import "./hero.css";
function Hero() {
  return (
    <main className="hero">
      <div className="content-hero">
        <h1>Love your plants Take care of yourself</h1>
        <p>5% of every purchase helps rescues</p>
        <button>NOW</button>
        <div className="Icon-hero">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-square-twitter"></i>
          <i className="fa-brands fa-square-youtube"></i>
        </div>
      </div>
      <div className="img-left-hero">
        <img src={HeroDog} alt="" />
      </div>
    </main>
  );
}
export default Hero;
