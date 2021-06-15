import { atom } from 'recoil'
import { Post } from 'types/post'

export const postsState = atom<Post[]>({
  key: 'posts',
  default: [],
})

export const dialogState = atom<boolean>({
  key: 'dialog',
  default: false,
})

export const idState = atom<string>({
  key: 'id',
  default: null,
})
