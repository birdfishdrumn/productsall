import React, { useState,useEffect } from 'react'
import axios from 'axios'

interface Props {
  name: string;
  date?:any
}

export const useProductStock = (name:string,date?:any)=> {
  const [stock, setStock] = useState(0)
    //  const [date, setDate] = useState(0)

  useEffect(() => {
    if (date) {
           axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/api/v2/searchProductStock`, {
        name: name,
        date:date
      })
      .then((res) => {
        console.log(res.data)
        setStock(res.data)
      })
    } else{
             axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/api/v2/searchProductStock`, {
        name: name,
      })
      .then((res) => {
        console.log(res.data)
        setStock(res.data)
      })
      }

    }, [name,date])

  return { stock}
}
