import React from 'react'
import { useProductStock } from "fooks/getProductStock"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from "@material-ui/core/IconButton"
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Image from "next/image"

const ProductCard = ({ post, handleChange }) => {
   const { stock } = useProductStock(post.name)
  return (
    <div className=" relative">
                <div className="pb-2 m-1  py-1 px-0 rounded-3xl h-full">



 <p className="text-md text-gray-500  sm:text-xs  md:text-xs lg:text-xs">{post.name?.slice(0,6)}</p>
        <div className="relative">
          <Image width={50} height={50} src={post.image.url} className="mx-auto mt-2 ob object-cover w-60 h-30" />
              <div className="rounded-lg w-full mx-auto absolute top-0 left-0">
          {post.stock - stock === 0 ?
                 <IconButton>
                          <RemoveShoppingCartIcon color="inherit"/></IconButton>
            :

            <IconButton onClick={() => handleChange(post)}>
                          <AddShoppingCartIcon color="error"/></IconButton>

        }

          {/* <p>{post.stock -stock}</p> */}
                  </div>
          {post.stock - stock <= 3 ?
             <p className="absolute right-2 bottom-2 font-semibold bg-indigo-200 p-2 rounded-full text-red-500 opacity-75">{post.stock - stock }</p>
          :

            <p className="absolute right-2 bottom-2 font-semibold bg-indigo-200 p-2 rounded-full opacity-75">{post.stock - stock}</p>
          }
        </div>
<p className="text-md font-semibold text-red-400 ">¥{post.price}</p>

      </div>


                <div className="absolute bottom-0 left-0 ">

                </div>
              </div>
  )
}

export default ProductCard
