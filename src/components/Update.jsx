import React from 'react'

const Update = ({updateSelectedItems}) => {
  return (
    <div>
    <button onClick={()=> updateSelectedItems()}>Edit</button>
  </div>
  )
}

export default Update