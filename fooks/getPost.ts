import React, { useState, useEffect } from 'react'
import { Post } from 'types/post'
import { postsState } from 'store/store'
import { useRecoilState } from 'recoil'

import { getPosts } from 'lib/post'

export const useAllPost = () => {
  const [posts, setPosts] = useRecoilState<Post[]>(postsState)
  const handleGetPosts = async (): Promise<void> => {
    const { data } = await getPosts()
    setPosts(data.posts)
  }

  useEffect(() => {
    handleGetPosts()
  }, [])

  return { posts }
}
