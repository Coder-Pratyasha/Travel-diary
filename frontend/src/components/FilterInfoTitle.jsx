import moment from 'moment'
import React from 'react'
import { IoIosClose } from 'react-icons/io'

const FilterInfoTitle = ({filterType, filterDate, onClear }) => {

    const DateRangeChip=({date})=>{
        const startDate=date?.from ? moment(date?.from).format("Do MMM YYYY"): "N/A"
        const endDate=date?.to ? moment(date?.to).format("Do MMM YYYY"): "N/A"
        return (
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 px-3 py-2 rounded-sm text-sm">
                <p>{startDate} - {endDate}</p>
                <button onClick={onClear}>
                    <IoIosClose className='cursor-pointer'/>
                </button>
            </div>
        )
    }
  return (
    filterType && (
        <div className="mb-5">
            {filterType === "search"?(
                <h3 className="text-lg font-medium">Search Results</h3>
            ):(
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-medium">Travel Stories from</h3>
                    <DateRangeChip date={filterDate} />
                    </div>
            )}
        </div>
    )
   
  )
}

export default FilterInfoTitle
