import React, { useState,useEffect } from 'react'
import axios from 'axios'

export const useProductStock = (name) => {
   const [stock, setStock] = useState(0)

    useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/api/v2/searchProductStock`, {
        name: name,
      })
      .then((res) => {
        console.log(res.data)
        setStock(res.data)
      })
    }, [name])

  return { stock}
}
