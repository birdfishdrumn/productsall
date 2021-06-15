import { AxiosPromise } from 'axios'

import client from './client'
import { PostApiJson } from '../types/post'

// post取得
export const getPosts = (): AxiosPromise<PostApiJson> => {
  return client.get('/posts')
}

// post作成
export const createPost = (data: FormData): AxiosPromise => {
  return client.post('/posts', data)
}
// post更新
export const updatePost = (data: FormData, id: string): AxiosPromise => {
  return client.patch(`/posts/${id}`, data)
}

export const getPartialPost = (id): AxiosPromise => {
  return client.post(`/getPartialPost/${id}`)
}

// post削除
export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/${id}`)
}
