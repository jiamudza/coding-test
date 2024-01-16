import React, { useEffect, useState } from "react";
import LogoutButton from "../components/logoutButton";
import axios from "axios";
import ProductAdd from "./add/add";
import { Link } from "react-router-dom";

function Products() {
  const [editing, setEditing] = useState(false)
  const [Add, setAdd] = useState(false);
  const [menu, setMenu] = useState();
  const [product, setProduct] = useState();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product",
    })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log("error"));
  }, [product]);

  console.log(product);
  console.log(menu);
  return (
    <body className="sm:px-2 md:px-10">
      <div className="flex justify-end py-10">
        <LogoutButton />
      </div>
      <button
        onClick={() => {
          setMenu(product.id);
          setAdd(true);
        }}
        className="bg-blue-500 sticky top-10 mb-5 text-white font-semibold rounded-md px-3 py-2"
      >
        Add
      </button>
      <div
        className={
          (Add? "fixed" : "hidden") +
          " h-[90vh] w-[80vw] top-10 left-1/2 -translate-x-1/2 bg-white shadow-primary rounded-lg overflow-visible"
        }
      >
        <ProductAdd />
      </div>

      {/* editing form */}
      <div
        className={
          (editing ? "fixed" : "hidden") +
          " h-[90vh] w-[80vw] top-10 left-1/2 -translate-x-1/2 bg-white shadow-primary rounded-lg overflow-visible"
        }
      >
        <ProductAdd />
      </div>
      <main className="flex flex-wrap justify-start -z-100 gap-y-10 mb-10 gap-x-8">
        {product &&
          product.map((item) => {
            return (
              <div
                id={item.id}
                className="sm:w-10 md:w-52 lg:w-72 shadow-primary py-4 px-5 rounded-xl ease-in-out duration-150 cursor-pointer"
              >
                <div
                  onClick={() => {
                    setMenu(item.id);
                  }}
                  className={
                    (Add ? "hidden" : "block") +
                    " leading-[5px] relative font-semibold mb-5 text-end cursor-pointer"
                  }
                >
                  ...
                  <div
                    className={
                      (menu === item.id ? "absolute" : "hidden") +
                      " absolute bg-white shadow-primary right-3 top-5 leading-5 text-center rounded-lg w-40 border-slate-500 px-2"
                    }
                  >
                    <Link
                      to={`/products/${item.id}`}
                      className="border-b py hover:text-blue-500"
                    >
                      Add Variant
                    </Link>
                    {/* <p onClick={() => {
                      setEditing(true)
                      setAdd(false)
                    }} className="border-b py-3 hover:text-green-500">Edit</p> */}
                    <p
                      onClick={(e) => {
                        axios
                          .delete(
                            `https://65a65bf674cf4207b4efd4dc.mockapi.io/api/v1/product/${item.id}`
                          )
                          .then((res) => res.data)
                          .catch((err) => err);
                      }}
                      className="py-3 hover:text-red-500"
                    >
                      Delete
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-white px-2 py-3 bg-indigo-600 rounded-lg">
                  {item.name}
                </p>
                <p className="mt-2 font-semibold">{item.brand}</p>
                <p className="mt-3">{item.description}</p>
                <p className="mt-4 italic">{item.SKU}</p>
              </div>
            );
          })}
      </main>
    </body>
  );
}

export default Products;
