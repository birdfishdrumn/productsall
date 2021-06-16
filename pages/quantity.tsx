import React, { useEffect, useState } from 'react'

import { getPosts } from '../lib/post'
import { Post } from '../types/post'
import axios from 'axios'
import Layout from 'components/Layout'
import PostItem from 'components/PostItem'
import { useAllPost } from 'fooks/getPost'
import CircularProgress from '@material-ui/core/CircularProgress';

const quantity = () => {
  const { posts } = useAllPost()
  return (
    <Layout title="販売商品">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="py-1 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      商品名
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      値段
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      販売数
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      在庫
                    </th>
                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      販売数
                    </th>

                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      編集
                    </th>
                  </tr>
                </thead>
                {posts.length ? posts.map((post) => <PostItem post={post} />) :
                     <div className="text-gray-400 text-center m-8 text-lg mx-auto ">
            <CircularProgress />
          </div>
                }
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default quantity
