import React, { useState } from 'react'
import ProductListView from './features/products/productListView';
import ProductForm from './features/products/productForm';







function App() {
   const [productToEdit,setProductToEdit]=useState({});
   const [isEdit,setIsEdit]=useState(false)

   const handlaSetProductToEdit=(product)=>{
               setProductToEdit(product);
               setIsEdit(true);
          
   }

  return (
    <div>
      <ProductForm   productToEdit={productToEdit} isEdit={isEdit} />
     <ProductListView  onhandlaSetProductToEdit={handlaSetProductToEdit}/>
    </div>
  );
}

export default App
