import React,{useEffect,useState,useCallback} from 'react';
import { Line } from 'react-chartjs-2';
import { orderState } from 'store/store';
import { useProductStock } from "fooks/getProductStock"
import { Order } from 'types/order'
import axios, { AxiosResponse } from 'axios'
interface Props {
  orders: Order[];
  date: string
  sumPrice:number
}

const HorizontalBarChart: React.FC<Props> = ({ orders, date,sumPrice }) => {

  console.log(orders.map((post) => post.name))
  const [sales,setSales] = useState<any[]>([])
    const newDate = new Date()
    const week = []
  for (var i = 0; i < 7; i++) {
   var before = new Date();
   before.setDate(newDate.getDate() - i);
   week.push(before.getMonth() + 1 + "/" + before.getDate());
  }

    const year = week.map((w) => newDate.getFullYear() + "/"+ w)

    console.log(year)

  const label: string[] = orders.map((post) => post.name)

  const postData = useCallback(async () => {
//     async function AsyncFetch(urls) {
//     const fetchArray = urls.map( url => fetch(url) );
//     return Promise.all(fetchArray);
// }
    const list = []
    const dd = await  Promise.all(year.map(async (y) => {

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/v2/orderPrice`,
        {

          date: y,
        }
      )

      const data = await res.data
      return data

    }
    ))
    setSales(dd)


  },[setSales])

  useEffect(() => {


    //     const postData = year.map(async (y) => {

    //      const res = await  axios.post(
    //     `${process.env.NEXT_PUBLIC_HOST}/api/v2/orderPrice`,
    //        {

    //       date: y,
    //     }
    //      )

    //       const data = await res.data
    //       return data

    // }

    // )
    postData()




  }, [])
console.log(sales)



  // console.log(sales.map(s=>s.data))
  // const stockData: number[] =
  //   label.map((l:string) => {
  //   const { stock } = useProductStock(l, date)
  //   return stock
  // }
  // )
  // console.log(stockData)
const data = {
  labels: year,
  datasets: [
    {
      label: '総売上',
      data: sales,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
  return (
    <>
      <div className='header'>


      </div>
      <Line
      type="basic"
        width={100}
        height={70}
        data={data}
        options={options} />
    </>
  )
};

export default HorizontalBarChart;
