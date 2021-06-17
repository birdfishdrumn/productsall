import React from 'react'
import { useProductStock } from "fooks/getProductStock"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from "@material-ui/core/IconButton"
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const ProductCard = ({ post, handleChange }) => {
   const { stock } = useProductStock(post.name)
  return (
    <div className=" relative">
                <div className="pb-16 m-1  py-1 px-0 rounded-3xl h-full">
                  <div className="flex justify-between">
                    <p className="text-md text-gray-500  sm:text-xs  md:text-xs lg:text-xs">{post.name}</p>
                    <p className="text-md font-semibold text-red-400 ">¥{post.price}</p>
        </div>
        <div className="relative">
          <img src={post.image.url} className="mx-auto mt-2 ob object-cover w-60" />
          {post.stock - stock <= 3 ?
             <p className="absolute right-2 bottom-2 font-semibold bg-indigo-200 p-2 rounded-full text-red-500 opacity-75">{post.stock - stock }</p>
          :

            <p className="absolute right-2 bottom-2 font-semibold bg-indigo-200 p-2 rounded-full opacity-75">{post.stock - stock}</p>
          }
        </div>

                </div>

                <div className="absolute bottom-0 left-0 ">
        <div className="pb-3 px-6 rounded-lg w-full mx-auto">
          {post.stock - stock === 0 ?
                 <IconButton>
                          <RemoveShoppingCartIcon color="inherit"/></IconButton>
            :

            <IconButton onClick={() => handleChange(post)}>
                          <AddShoppingCartIcon color="error"/></IconButton>


        }

          {/* <p>{post.stock -stock}</p> */}
                  </div>
                </div>
              </div>
  )
}

export default ProductCard
