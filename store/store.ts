import { atom } from 'recoil'
import { Post } from 'types/post'
import { Order } from 'types/order'

export const postsState = atom<Post[]>({
  key: 'posts',
  default: [],
})

export const dialogState = atom<boolean>({
  key: 'dialog',
  default: false,
})

export const confirmDialogState = atom<boolean>({
  key: 'confirmDialog',
  default: false,
})

export const idState = atom<string>({
  key: 'id',
  default: null,
})

export const orderState = atom<Post[]>({
  key: 'orders',
  default: [],
})
