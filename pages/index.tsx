import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import PostForm from 'components/PostForm'
import Drawer from 'components/Drawer'
import { useAllPost } from 'fooks/getPost'

import { getPosts } from '../lib/post'
import { getOrder } from '../lib/order'
import { Post } from '../types/post'
import { Order } from 'types/order'
import postcss from 'postcss'
import Layout from 'components/Layout'

const PostList: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([])
  const [list,setList ] = useState([])
  const [orders, setOrders] = useState<Order[]>([])
  const [open, setOpen] = React.useState(false)
  const { posts } = useAllPost()



  console.log(list)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orders`).then((res) => {
      setList(res.data.orders)
    })
  }, [])


  const handleChange = (post) => {
    setOrders((prevState: Order[]) => [...prevState, post])
    handleDrawerOpen()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  console.log(orders)

  console.log(posts)
  return (
    <Layout title="注文会計">
      <Drawer
        orders={orders}
        open={open}
        setOrders={setOrders}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleChange={handleChange}
      />


      {/* <PostForm handleGetPosts={handleGetPosts} /> */}

    </Layout>
  )
}

export default PostList
