import Navbar from "./Navbar/index";
import FilterTab from "./FilterTab/index";
import ProductList from "./ProductList/index";

import { GoDotFill } from "react-icons/go";

import "./App.css";

import { useEffect, useState } from "react";

const defaultProducts = {
  page: 0,
  pageSize: 0,
  totalPages: 10,
  totalProducts: 0,
  products: [],
};

const App = () => {
  const [filters, updateFilter] = useState([]);
  const [activeFilter, updateActiveFilter] = useState(null);
  const [reachedEnd, updateReached] = useState(false);
  const [products, updateProducts] = useState(defaultProducts);

  const changeActiveFilter = (item) => {
    updateProducts(defaultProducts);
    updateActiveFilter(item);
    updateReached(false);
  };

  const getFilters = async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingFilters";

    const requestBody = {
      id: "#HomeHunts",
      entity: "vibe",
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      updateFilter(data["data"]["getListingFilters"]["easyFilters"]);
    }
  };

  const getProducts = async () => {
    const url = "https://api.furrl.in/api/v2/listing/getListingProducts";

    const requestBody = {
      input: {
        page: products.page + 1,
        pageSize: 10,
        filters:
          activeFilter === null
            ? []
            : { id: activeFilter.uniqueId, type: activeFilter.contentType },
        id: "#HomeHunts",
        entity: "vibe",
      },
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      updateProducts({
        ...data["data"]["getListingProducts"],
        products: [
          ...products["products"],
          ...data["data"]["getListingProducts"]["products"],
        ],
      });
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    reachedEnd && getProducts();
  }, [reachedEnd]);

  useEffect(() => {
    getProducts();
  }, [activeFilter]);

  const renderProductsList = () => {
    return products.products.map((eachItem, index) => (
      <ProductList eachItem={eachItem} index={index} />
    ));
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 80
      ) {
        !reachedEnd && updateReached(true);
      }
    });

    return window.removeEventListener("scroll", () => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="banner-container">
        <h2 className="banner-container-heading">#HomeHunts</h2>
      </div>
      <div className="products-list-container">
        <div className="products-details-container">
          <p className="products-heading">Shop Products</p>
          <GoDotFill className="count-dot" />
          <p className="product-count">{products.totalProducts} products</p>
        </div>
        <ul className="filters-container">
          <li
            onClick={() => {
              changeActiveFilter(null);
            }}
            className={`filter-tab ${
              activeFilter === null && "active-filter-tab"
            }`}
          >
            All
          </li>
          {filters.map((eachItem) => (
            <FilterTab
              key={eachItem.uniqueId}
              eachItem={eachItem}
              activeFilter={activeFilter}
              changeActiveFilter={changeActiveFilter}
            />
          ))}
        </ul>
      </div>
      <ul className="products-container">{renderProductsList()}</ul>
    </>
  );
};

export default App;
