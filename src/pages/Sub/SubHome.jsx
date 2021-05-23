import React, { useState, useEffect } from "react";
import { getSub } from "../../services/sub";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);

  const { slug } = match.params;

  useEffect(() => {
    getSub(slug).then((res) => {
      setSub(res.data.sub);
      setProducts(res.data.products);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <CategoryList />

      <div className="row">
        {products.map((p) => (
          <div className="col-12 col-md-6 col-lg-4 py-2" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubHome;
