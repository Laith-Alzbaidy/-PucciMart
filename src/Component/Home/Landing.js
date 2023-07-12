import About from "./About/About";
import Products from "./Product/Product";
import Qotes from "./Qots/Qouts";
import Services from "./Services/Services";
import Hero from "./Herosection/hero";
import Feedback from "../Post/Post";
function Landingpage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Products />
      <Qotes />
      {/* <Feedback /> */}
      <a id="upLink" href="#">
        <i id="up" class="fa-solid fa-circle-up"></i>
      </a>
    </>
  );
}
export default Landingpage;
