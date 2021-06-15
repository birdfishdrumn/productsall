import axios, { AxiosInstance, AxiosResponse } from 'axios'

let client: AxiosInstance

export default client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/api/v1`,
  headers: {
    'Content-Type': 'multipart/form-data', // 画像ファイルを取り扱うのでform-dataで送信
  },
})

export const orderClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST}/api/v2`,
})

client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const data = response.data
    return { ...response.data, data }
  }
)

// client.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//       const data = response.data
//       return { ...response.data, data }
//   }
// )
