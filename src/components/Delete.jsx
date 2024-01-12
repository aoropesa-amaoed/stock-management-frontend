import React from 'react'

const Delete = ({deleteSelectedItem}) => {
  return (
    <div>
        <button onClick={deleteSelectedItem}>Delete</button>
    </div>
  )
}

export default Delete;