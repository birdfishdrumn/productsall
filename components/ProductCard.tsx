import React from 'react'
import {useProductStock} from "fooks/getProductStock"

const ProductCard = ({ post, handleChange }) => {
   const { stock } = useProductStock(post.name)
  return (
    <div className=" relative">
                <div className="pb-24 bg-white py-4 px-4 shadow-2xl border-4  rounded-3xl h-full">
                  <div className="flex justify-between">
                    <p className="text-md text-gray-500  sm:text-xs  md:text-xs lg:text-xs">{post.name}</p>
                    <p className="text-md font-semibold text-red-400 ">¥{post.price}</p>
                  </div>
                  <img src={post.image.url} className="mx-auto mt-2 " />
                </div>

                <div className="absolute bottom-0 left-0 ">
        <div className="pb-6 px-6 rounded-lg w-full mx-auto">
          {post.stock - stock === 0 ?
            <p className="bg-red-500 text-white font-bold py-3 px-3 rounded-lg uppercase text-sm sm:text-xs shadow-xl"
                    >在庫0</p>
            :
     <button
                      onClick={() => handleChange(post)}
                      className="bg-gradient-to-b from-pink-400 to-pink-500 text-white font-bold py-3 px-3 rounded-lg uppercase sm:text-xs text-sm  shadow-xl"
                    >
                      購入する
          </button>
        }

          {/* <p>{post.stock -stock}</p> */}
                  </div>
                </div>
              </div>
  )
}

export default ProductCard
