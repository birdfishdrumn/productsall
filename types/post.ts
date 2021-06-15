export type Post = {
  id: string
  name: string
  price: number
  stock: number
  image?: {
    url: string
  }
}

export type PostApiJson = {
  posts: Post[]
}
