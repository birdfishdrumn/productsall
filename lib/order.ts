import { AxiosPromise } from 'axios'

import { orderClient } from './client'
import { OrderApiJson } from '../types/order'

// order取得
export const getOrder = (): AxiosPromise<OrderApiJson> => {
  return orderClient.get('/orders')
}

// // post作成
// export const createPost = (data: FormData): AxiosPromise => {
//   return client.post("/posts", data)
// }

// // post削除
// export const deletePost = (id: string): AxiosPromise => {
//   return client.delete(`/posts/${id}`)
// }
