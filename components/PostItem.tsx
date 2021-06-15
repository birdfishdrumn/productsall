import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import FloatingActionButton from 'components/Ui/FloatingActionButton'
import { dialogState, idState } from 'store/store'
import { useRecoilState } from 'recoil'
import {useProductStock} from "fooks/getProductStock"

const PostItem = ({ post }) => {

  const [id, setId] = useRecoilState(idState)
  const [open, setOpen] = useRecoilState(dialogState)
  const name= post.name
  const { stock } = useProductStock(name)


  const handleDialog = (id: string) => {
    setOpen(true)
    setId(id)
  }


  return (
    <tbody>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-1/5">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10">
              <img className="w-full h-full rounded-full" src={post.image.url} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">{post.name}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-12">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-gray-900  text-center whitespace-no-wrap">{post.price}</p>
            </div>
          </div>
        </td>
        <td className="px-2 py-5 w-40 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap m-2 text-center">{stock}</p>
        </td>
        <td className="px-2 py-5 w-40 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap m-2 text-center">
            {post.stock - stock === 0 ? (
              <p className="text-red-400">在庫切れ</p>
            ) : (
              post.stock - stock
            )}
          </p>
        </td>
        <td className="px-3 w-96 py-5 border-b border-gray-200 bg-white text-sm text-left ml-auto">
          <div className="flex flex-wrap">
            {[...Array(stock)].map((stock) => (
              <div className="w-2 h-2 bg-gray-500 m-1" />
            ))}
          </div>
        </td>
        <td className="px-2 py-5  border-b border-gray-200 bg-white text-sm">
          <IconButton onClick={() => handleDialog(post.id)}>
            <EditIcon />
          </IconButton>
        </td>
      </tr>
      <FloatingActionButton />
    </tbody>
  )
}

export default PostItem
