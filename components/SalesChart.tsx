import React from 'react';
import { Bar } from 'react-chartjs-2';
import { postsState } from 'store/store';
import { useProductStock } from "fooks/getProductStock"
import { Post } from 'types/post'

interface Props {
  posts: Post[];
  date:string
}

const HorizontalBarChart:React.FC<Props> = ({ posts,date }) => {
  console.log(posts.map((post) => post.name))

  const label: string[] = posts.map((post) => post.name)
  const stockData: number[] =
    label.map((l:string) => {
    const { stock } = useProductStock(l, date)
    return stock
  }
  )
  console.log(stockData)

    const data = {

    labels: label,
    datasets: [
      {
       data:stockData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {

      title: {
        display: true,
        text: '商品別売り上げ',
      },
    },
  };

  return (
    <>
      <div className='header'>


      </div>
      <Bar
        type="horizontalBar"
        width={100}
        height={70}
        data={data}
        options={options} />
    </>
  )
};

export default HorizontalBarChart;
