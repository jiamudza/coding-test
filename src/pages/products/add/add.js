import axios from "axios";
import React, { useState } from "react";
import { FaSortDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

function ProductAdd() {
  // const navigate = useNavigate()
    const [brand, setBrandMenu] = useState(false)
    const [product, setProduct] = useState({
      variation: [{
        name: "air jordan 25x",
        SKU: "13245",
        price: "Rp250.000"
      },]
    })

    const handleSubmit = (e) => {

        axios({
            method:'POST',
            url: "https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product",
            data: product,
        })
        .then(res => res.data)
        .catch(err => err)
        
    }

    console.log(product)
  return (

    <div className="h-full overflow-auto">
      <form className="flex px-10 py-10 justify-start flex-wrap overflow-auto gap-x-32 gap-y-10">

        <div className="flex flex-col">

          <label>Nama Produk</label>
          <input onChange={(e) => {
            setProduct({...product, name : e.target.value})
          }} type="text" className="original-border w-80" />

          <label className="mt-5">SKU</label>
          <input onChange={(e) => {
            setProduct({...product, SKU : e.target.value})
          }} type="text" className="original-border w-80" />

          <div className="mt-5">

            <button onClick={(e) => {
                e.preventDefault()
                setBrandMenu(true)
            }} className="button-primary flex gap-1">
                <p className="border-r px-2">Brand</p>
                <p><FaSortDown /></p>
            </button>

            <div className={(brand ? "block" : "hidden") + " py-2 w-80 border mt-5 px-3 h-40"}>
                <p
                onClick={(e) => {
                    setProduct({...product, brand: e.target.innerHTML})
                }}
                className="font-semibold border-b py-2 cursor-pointer hover:text-indigo-600
                " value="Air Jordan">
                    Air Jordan
                </p>
                <p 
                onClick={(e) => {
                    setProduct({...product, brand: e.target.innerHTML})
                }} className="font-semibold border-b py-2 cursor-pointer hover:text-indigo-600">
                    Nike
                </p>
                <p
                onClick={(e) => {
                    setProduct({...product, brand: e.target.innerHTML})
                }} className="font-semibold border-b py-2 cursor-pointer hover:text-indigo-600">
                    Puma
                </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
            <label>Description</label>
            <textarea
            onChange={(e) => {
                setProduct({...product, description : e.target.value})
              }} className="w-80 h-80 original-border" />
        </div>

        
      </form>
      <div className="flex justify-center gap-5">
        <button onClick={handleSubmit} className="button-primary">Submit</button>
      </div>
    </div>
  );
}

export default ProductAdd;
