import React from 'react'

export default function page({searchParams}:{searchParams:any}) {
    const {action} = searchParams
    //console.log(searchParams)
  return (
    <div>{action}</div>
  )
}
