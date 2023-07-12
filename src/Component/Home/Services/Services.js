import rapiet from "../../../Imges/rapiet.png";
import bird from "../../../Imges/bird.png";
import cat from "../../../Imges/cat.png";
import dog from "../../../Imges/dog.png";
import fish from "../../../Imges/fish.png";
import "./Services.css";
function Services() {
  return (
    <section className="Services" id="Services">
      <div className="title-services">
        <h1>Shop By Pet</h1>
        <p>
          Shop the latest high-end designer products for your pups at our luxury
          dog boutique!
        </p>
      </div>
      <div className="Cards-services">
        <div className="card-services">
          <div className="Content-card-services">
            <img src={bird} alt="" />
            <p>Bird</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={cat} alt="" />
            <p>Cat</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={dog} alt="" />
            <p>Dog</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={fish} alt="" />
            <p>fish</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
