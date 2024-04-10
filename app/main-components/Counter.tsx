"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../store/counterSlice'

export default function Counter() {
    const count = useSelector((state:any)=>state.count)
    const dispatch=useDispatch()
    const handleIncrement=()=>{
        dispatch(increment())
    }
  return (

    
    <div>
        <h4 className="text-center"> Count:{count} </h4>
        <button className="btn btn-primary" onClick={handleIncrement}>Increment</button>
    </div>
  )
}
