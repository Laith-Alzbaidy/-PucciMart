import imges from "../../../Imges/rapiet.png";
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
            <img src={imges} alt="" />
            <p>Rabbit</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={imges} alt="" />
            <p>Rabbit</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={imges} alt="" />
            <p>Rabbit</p>
          </div>
        </div>
        <div className="card-services">
          <div className="Content-card-services">
            <img src={imges} alt="" />
            <p>Rabbit</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
