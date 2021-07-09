import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {Post} from "types/post"

interface Props {
  order: Post;
  handleDelete?: (string)=>void
}

const OrderItem:React.FC<Props> = ({order,handleDelete}) => {
  return (
    <div>
        <div className="pb-1  m-1  py-1 px-0 h-full">
                  <div className="flex justify-between">

                    <p className="text-md font-semibold text-red-400 ">¥{order.price}</p>
                </div>
                <div className="relative">
          <img src={order.image.url} className="mx-auto mt-1 ob object-cover w-16" />
          {handleDelete &&
                  <IconButton onClick={() => handleDelete(order.id)} className="absolute bottom-0  right-0">
                    <DeleteIcon />
                  </IconButton>
          }
                </div>


                </div>

    </div>
  )
}

export default OrderItem
