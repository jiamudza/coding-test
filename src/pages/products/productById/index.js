import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductAdd from "../add/add";
import LogoutButton from "../../components/logoutButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function ProductById() {
    const [add, setAdd] = useState(false)
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    axios({
      url: `https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product/${id}`,
      method: "GET",
    })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => err);
  }, [id]);

  const [addedVariant, setAddedVariant] = useState({
    name : "",
    SKU : "",
    price : ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdd(false)
    axios.put(`https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product/${id}`, {
      ...product,
      variation: [...product.variation, {...addedVariant, id: product.variation.length}]
    })
    .then(res=> res.data)
    .catch(err => err)
  }

  console.log(addedVariant)
  return (
    <div className="px-10 py-10">
      <div className="flex justify-between">
        <Link to={"/products"} className="flex button-primary items-center">
          <IoIosArrowRoundBack size={29} />
          <p>Back</p>
        </Link>
        <LogoutButton />
      </div>
      <h3 className="font-bold text-4xl mb-10 mt-10">Variant</h3>

      <button 
      onClick={() => {
        setAdd(true)
      }} className="button-primary sticky top-5">Add Variant</button>

      <div className={(add ? "fixed" : "hidden") + " h-[70vh] w-[40vw] top-10 left-1/2 -translate-x-1/2 bg-white shadow-primary rounded-lg overflow-visible"}>
        
        <form className="flex flex-col px-10 py-10">
          
          <label>Name</label>
          <input onChange={(e) => {
            setAddedVariant({...addedVariant, name: e.target.value})
          }} className="original-border" type="text" />
         
          <label>SKU</label>
          <input onChange={(e) => {
            setAddedVariant({...addedVariant, SKU: e.target.value})
          }} className="original-border" type="text" />
          
          <label>Price</label>
          <input onChange={(e) => {
            setAddedVariant({...addedVariant, price: e.target.value})
          }} className="original-border" type="text"/>
         
          <button onClick={handleSubmit} className="button-primary mt-10">Submit</button>
        </form>
     
      </div>
      
      <main className="mt-5 flex flex-wrap justify-start">
        
        {product &&
          product.variation.map((item) => {
            return (
              <div id={item.id} className="original-border w-80 rounded-lg shadow-2xl">
                
                <div className="bg-indigo-600 flex items-center justify-between">
                <span className=" px-2 py-3 text-white font-semibold">{item.name}</span>
                <span
                  onClick={(e) => {
                    axios.put(`https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product/${id}`, {
                      ...product,
                      variation: product.variation.slice(item.id - 1)
                    })
                    .then(res => res.data.data)
                    .catch(err => err)
                  }}
                className="text-2xl cursor-pointer bg-red-500 px-3 text-white font-semibold">x</span>
                </div>
                <p className="mt-3">{item.SKU}</p>
                <p className="mt-3 font-semibold">Rp{item.price}</p>
              
              </div>

            );
          })}
      </main>
    </div>
  );
}

export default ProductById;
