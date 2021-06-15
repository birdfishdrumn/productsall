import React, { useEffect, useState, useCallback } from 'react'
import { getOrder } from '../lib/order'
import Layout from 'components/Layout'
import { Order } from '../types/order'
import Divider from '@material-ui/core/Divider'
import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import SelectBox from 'components/Ui/SelectBox'
import ReactDatePicker from 'components/ReactDatePicker'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

dayjs.locale('ja')

const order = () =>{
  const initialDate = new Date()
  const [orders, setOrders] = useState<Order[]>([])
  const [sumPrice, setSumPrice] = useState<number>(0)
  const [search, setSearch] = useState<string>(null)
  const [startDate, setStartDate] = useState<Date>(initialDate)

  const handleGetPosts = async () => {
    // const { data } = await getOrder()
    // console.log(data)


  }

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
    // axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orderPrice`).then((res) => {
    //   setSumPrice(res.data)
    //   console.log(res.data)
    // })
  }, [])

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

        {/* <h1 className="text-gray-400 m-8 text-2xl text-center">合計金額{sumPrice}</h1> */}

        {
        // orders.length ? (
          orders.map((order) => (
            <div className="flex flex-wrap mt-12 justify-center border-b-2 max-w-2xl mx-auto pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                <div className="col-span-2 sm:col-span-1 xl:col-span-1">
                  <img alt="..." src={order.image} className="h-24 w-24 rounded  mx-auto" />
                </div>
                <div className="col-span-2 sm:col-span-4 xl:col-span-4">
                  <h3 className="font-semibold text-black">{order.name}</h3>
                  <p className="my-4 text-gray-400">
                    購入時間:{dayjs(order.created_at).format('YYYY/MM/DD HH:mm')}
                  </p>
                </div>
                <div className="text-red-400 text-lg col-span-2 sm:col-span-1 xl:col-span-1 italic ">
                  ¥{order.price}
                </div>
              </div>

            </div>
          ))
        // )
        // : (
        //   <p className="text-gray-400 text-center my-4 text-lg">
        //     検索に一致する購入履歴はありません。
        //   </p>
        // )
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
