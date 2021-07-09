import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { deleteOrder } from "lib/order"



const OrderHistoryItem = ({ order, setOrders }) => {
  const deleteItem = async (id: string): Promise<void> => {
   const result = window.confirm('こちらの注文を返品しますか？');
   const res = await deleteOrder(id)
    const orders = await res.data.orders
      result &&

    setOrders(orders)
}
  return (
      <div className="relative flex flex-wrap mt-12 justify-center border-b-2 max-w-2xl mx-auto pb-4">
              <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                <div className="col-span-2 sm:col-span-1 xl:col-span-1">
                  <img alt="..." src={order.image} className="h-24 w-24 rounded  mx-auto" />
                </div>
                <div className="col-span-2 sm:col-span-4 xl:col-span-4">
                  <h3 className="font-semibold text-black">{order.name}</h3>
                  <p className="my-4 text-gray-400">
                    {dayjs(order.created_at).format('YYYY/MM/DD HH:mm')}
                  </p>
                </div>
                <div className="text-red-400 text-lg col-span-2 sm:col-span-1 xl:col-span-1 italic my-auto">
                  ¥{order.price}
                </div>
              </div>
      <p onClick={()=> deleteItem(order.id)}className="absolute bottom-1 right-1 text-gray-300 hover:text-gray-600">返品する</p>

            </div>
  )
}

export default OrderHistoryItem
