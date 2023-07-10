import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";

function Allproducts() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllProducts = () => {
    axios.get("http://localhost:9000/products").then((response) => {
      setProducts(response.data);
    });
  };

  const getCategory = () => {
    axios.get("http://localhost:9000/category").then((response) => {
      setCategory(response.data.map((cat) => cat.id));
    });
  };

  const getProductByCategory = (categoryName) => {
    axios
      .get(`http://localhost:9000/category/${categoryName}`)
      .then((response) => {
        setProducts(response.data.types);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showProducts = filteredProducts.map((product) => (
    <Product key={product.id} product={product} />
  ));

  useEffect(() => {
    getAllProducts();
    getCategory();
  }, []);

  return (
    <section className="Products ProductsAll" id="Product">
      <div className="Cont-Catigory">
        <button onClick={getAllProducts} className="List-Catigory">
          All Products
        </button>
        {category.map((cat) => (
          <button
            key={cat}
            onClick={() => getProductByCategory(cat)}
            className="List-Catigory"
          >
            {cat}
          </button>
        ))}
        <div class="input-group rounded">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            // value={search}
            onChange={handleSearch}
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>

      <div className="cards">{showProducts}</div>
    </section>
  );
}

export default Allproducts;
