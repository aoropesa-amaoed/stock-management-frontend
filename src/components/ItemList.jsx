import React from 'react'

const ItemList = ({items,selectedItems,handleCheckboxChange}) => {
  return (
    <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Item Code</th>
              <th>Item Description</th>
              <th>UoM</th>
              <th>Price</th>
              <th>InStock</th>
              <th>MinStock</th>
              <th>MaxStock</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                </td>
                <td>{item.itemCode}</td>
                <td>{item.itemDescription}</td>
                <td>{item.inventoryUoM}</td>
                <td>{item.price}</td>
                <td>{item.InStock}</td>
                <td>{item.MinStock}</td>
                <td>{item.MaxStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default ItemList