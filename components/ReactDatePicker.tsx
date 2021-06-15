import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'
dayjs.locale('ja')

const ReactDatePicker = ({ startDate, setStartDate, handlePush }) => {
  const initialDate = new Date()
  // const [startDate, setStartDate] = useState(initialDate)
  const handleChange = async (date: Date) => {
    setStartDate(date)
  }

  return (
    <>
      <DatePicker className="bg-gray-200 p-2 rounded-3xl" selected={startDate} onChange={handleChange} />
    </>
  )
}

export default ReactDatePicker
