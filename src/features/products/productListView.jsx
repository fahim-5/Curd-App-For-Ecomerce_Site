import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, fetchProducts, updateProducts } from "./productSlice";
import './style.css';

function ProductListView({onhandlaSetProductToEdit}) {
  const { products, isLoading, error } = useSelector((state) => state.productR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProducts(id)); // Dispatch the delete action with the product ID
  };

  const handleEdit=(product)=>{
    onhandlaSetProductToEdit(product);
  }

  return (
    <div>
      <h2>Product List</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && products.length > 0 && (
        <section className="product">
          {products.map((product) => {
            return (
              <article key={product.id}>
                <h2>{product.title}</h2>
                <h1>{product.description}</h1>
                <p>{product.category}</p>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => handleEdit(product)}>Edit</button>
              </article>
            );
          })}
        </section>
      )}
      {products.length === 0 && !isLoading && !error && (
        <p>No products available</p>
      )}
    </div>
  );
}

export default ProductListView;
