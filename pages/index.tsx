import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import Drawer from 'components/Drawer'
import { useAllPost } from 'fooks/getPost'
import { Post } from '../types/post'
import Layout from 'components/Layout'
import { orderState } from 'store/store'
import { useRecoilValue, useRecoilState } from 'recoil'

const PostList: React.FC = () => {

  const [list,setList ] = useState([])
  const [orders, setOrders] = useRecoilState(orderState)
  const { posts } = useAllPost()



  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orders`).then((res) => {
      setList(res.data.orders)
    })
  }, [])

  // 商品を買い物カゴに入れる処理

  const handleChange = (post:Post) => {
    setOrders((prevState: Post[]) => [...prevState, post])

  }

  console.log(orders)

  console.log(posts)
  return (
    <Layout title="注文会計">
      <Drawer
        orders={orders}
        setOrders={setOrders}

        handleChange={handleChange}
      />


      {/* <PostForm handleGetPosts={handleGetPosts} /> */}

    </Layout>
  )
}

export default PostList
