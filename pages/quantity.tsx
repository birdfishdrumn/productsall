import React, { useEffect, useState,useCallback } from 'react'
import Layout from 'components/Layout'
import PostItem from 'components/PostItem'
import { useAllPost } from 'fooks/getPost'
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActionButton from 'components/Ui/FloatingActionButton'
import ReactDatePicker from 'components/ReactDatePicker'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import axios, { AxiosResponse } from 'axios'
import { Order } from 'types/order'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import SalesChart from "components/SalesChart"

const quantity = () => {
    const initialDate = new Date()
  const { posts } = useAllPost()
  const [startDate, setStartDate] = useState<Date>(initialDate)
  const [search, setSearch] = useState<string>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isActive,setIsActive] = useState<boolean>(false)

    const date = dayjs(startDate).format('YYYY-MM-DD')

  const handlePush = useCallback(async () => {
    const resData: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/v2/searchDate`,
      {
        date: date,
      }
    )

    setSearch(date)
    setOrders(resData.data.orders)

  }, [date])

  const style = "m-4 p-4 text-gray-400 rounded-lg border-2 cursor-pointer"


  return (
    <Layout title="販売商品">
          <div className="flex flex-wrap text-center justify-center">
          <div className="w-full lg:w-6/12 px-4">


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
        <p onClick={()=>setIsActive(false)}className={isActive ? style : style + " border-indigo-400 text-indigo-500 " }>在庫設定</p>
          <p onClick={()=>setIsActive(true)} className={isActive ? style + " border-indigo-400 text-indigo-500 ": style }>個別売り上げ</p>
      </div>

      {isActive ?
        <SalesChart posts={posts} date={date}/>

      :

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="py-1 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      商品名
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      値段
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      販売数
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      在庫
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      販売数
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      編集
                    </th>
                  </tr>
                </thead>
                {posts.length ? posts.map((post) => <PostItem post={post} date={date}/>) :
                     <div className="text-gray-400 text-center m-8 text-lg mx-auto ">
            <CircularProgress />
          </div>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
      }

           <FloatingActionButton />
    </Layout>
  )
}

export default quantity
