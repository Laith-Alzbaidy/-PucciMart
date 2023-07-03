import Imges1 from "../../../Imges/IMG_ABOUT_1.png";
import Imges2 from "../../../Imges/IMG2_ABOUT_2.png";
import "./About.css";

function About() {
  return (
    <section className="About" id="About">
      <div className="section-left">
        <div className="Images-about">
          <img className="img1" src={Imges1} alt="" />
          <img className="img2" src={Imges2} alt="" />
        </div>
      </div>
      <div className="section-right">
        <div className="content-right">
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            exercitationem quia soluta vitae fuga eum, quo architecto earum
            natus quidem expedita blanditiis? Itaque, dolor voluptate laboriosam
            quia delectus sunt eius.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
