import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProducts, updateProducts } from "./productSlice"; // Ensure this action is defined in your productSlice
import "./style.css"; // Make sure you style the form using this CSS file.

// productToEdit.id

function ProductForm({ productToEdit={}, isEdit=false }) {
  const [product, setProduct] = useState({
    id: "", 
    title: "",
    description:"",
    category: "",
  });

  
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        id: productToEdit.id ?? " ", 
        title: productToEdit.title ?? " " ,
        description: productToEdit.description ?? " " ,
        category: productToEdit.category ?? " ",
      });
    }
  }, [productToEdit]);


  const [error, setError] = useState("");

  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !product.id ||
      !product.title ||
      !product.description ||
      !product.category
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Dispatch action to add product
     if(isEdit){
         dispatch(updateProducts({id :product.id ,product:product}))
     }else{
        dispatch(createProducts(product));
     }

    // Reset form and error
    setProduct({
      id: "",
      title: "",
      description: "",
      category: "",
    });
    setError("");
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={product.id}
          onChange={handleChange}
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <button type="submit">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
