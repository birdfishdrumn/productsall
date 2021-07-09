import React, { useEffect, useState, useCallback } from 'react'
import { getOrder } from '../lib/order'
import Layout from 'components/Layout'
import { Order } from '../types/order'
import Divider from '@material-ui/core/Divider'
import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import ReactDatePicker from 'components/ReactDatePicker'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress';
import OrderChart from "components/OrderChart"
import OrderHistoryItem from "components/OrderHistoryItem"

dayjs.locale('ja')

const order = () =>{
  const initialDate = new Date()
  const [orders, setOrders] = useState<Order[]>([])
  const [sumPrice, setSumPrice] = useState<number>(0)
  const [search, setSearch] = useState<string>(null)
  const [startDate, setStartDate] = useState<Date>(initialDate)
   const [isActive,setIsActive] = useState<boolean>(false)



  const date = dayjs(startDate).format('YYYY-MM-DD')

  const handlePush = useCallback(async () => {
    const resData: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/v2/searchDate`,
      {
        date: date,
      }
    )

    const resPriceData: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/v2/orderPrice`,
      {
        date: date,
      }
    )
    setSearch(date)
    setOrders(resData.data.orders)
    setSumPrice(resPriceData.data)
  }, [date])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orders`).then((res)=>{
setOrders(res.data.orders)
    })
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orderPrice`).then((res) => {
      setSumPrice(res.data)
      console.log(res.data)
    })
  }, [])

    const style = "m-4 p-4 text-gray-400 rounded-lg border-2 cursor-pointer"

  return (
    <Layout title="注文リスト">

      <div id="menu" className="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold text-black">注文履歴</h2>
            <p className="m-4 ">{search && search}の検索結果</p>
          </div>
        </div>
        <div className="mx-auto text-center">
          <IconButton onClick={() => handlePush()}>
            <SearchIcon />
          </IconButton>
          <ReactDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
           <div className="flex justify-center">
        <p onClick={()=>setIsActive(false)}className={isActive ? style : style + " border-indigo-400 text-indigo-500 " }>注文履歴</p>
          <p onClick={()=>setIsActive(true)} className={isActive ? style + " border-indigo-400 text-indigo-500 ": style }>日別グラフ</p>
        </div>

        {isActive ?
          <OrderChart orders={orders} date={date} sumPrice={sumPrice}/>
        :
          <>
       <h1 className="text-gray-400 m-8 text-2xl text-center">合計金額{sumPrice}</h1>

        {

        orders.length ? (
          orders.map((order) => (
            <OrderHistoryItem order={order} setOrders={setOrders}/>
          ))
        )
        : (
          <p className="text-gray-400 text-center my-4 text-lg">
            <CircularProgress />
          </p>
        )
        }
        </>
      }

      </div>
    </Layout>
  )
}

export default order

// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   return {
//     props: { events},
//     revalidate:1
//   }
// }
