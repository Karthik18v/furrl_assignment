import "./index.css";

const ProductList = (props) => {
  const { eachItem, index } = props;
  console.log(eachItem);
  const imageSrc = eachItem["images"][0]["src"];
  const imageAlt = eachItem["title"];

  const onClickItem = () => {
    window.location.href = `https://furrl.in/productDetail?id=${eachItem.id}&ref=vibeResults_HomeHunts`;
  };
  const onClickShare = async (event) => {
    event.stopPropagation();
    try {
      const data = {
        title: `${eachItem.title}`,
        text: `I found this amazing product from a unique, new-age brand on Furrl - ${eachItem.title}`,
        url: `https://furrl.in/productDetail?id=${eachItem.id}`,
      };

      await navigator.share(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li
      onClick={onClickItem}
      key={eachItem["id"]}
      className={`product-item ${index % 5 === 2 && "product-item-single"}`}
    >
      <img
        loading="lazy"
        className={`product-img ${index % 5 === 2 && "product-img-single"}`}
        src={imageSrc}
        alt={imageAlt}
      />
      <div className="product-details-container">
        <img
          src="https://i.imghippo.com/files/5JLjU1716410392.jpg"
          alt="share"
          onClick={onClickShare}
          className={`share-icon ${index % 5 === 2 && "share-icon-single"}`}
        />

        <p className="vendor-name">{eachItem["brand"][0]["name"]}</p>
        <p className="vendor-name product-name">{eachItem["title"]}</p>
        <p className="vendor-name product-name product-price">
          {`Rs. ${eachItem["price"]["value"]}`}{" "}
          <span className="product-mrp">{`Rs. ${eachItem["MRP"]["value"]}`}</span>
          <span className="product-discount">{`${eachItem["discountPercent"]}%`}</span>
        </p>
      </div>
    </li>
  );
};

export default ProductList;
