import React from 'react'

const ItemForm = ({handleSubmit, 
                    addItems,
                    isEditing, 
                    newItemCode,
                    handleEditInputItemCode,
                    handleItemCodeChange,
                    newItemDesc,
                    handleEditInputItemDesc,
                    handleItemDescChange,
                    newItemUom, handleEditInputUoM,handleInventoryUoMChange,
                    newItemPrice,handleEditInputPrice,handlePriceChange,
                    newItemInStock, handleEditInputInStock,handleInStockChange,
                    newItemMinStock,handleEditInputMinStock,handleMinStockChange,
                    newItemMaxStock, handleEditInputMaxStock,handleMaxStockChange,
                    updateSelectedItems,editedItem

                    }) => {
  return (
    <div>
        <div>
          <h3>Add Items</h3>
        </div>
        <div>
          <form onSubmit= {addItems}>
            <div>
              <input type="text" 
                    value={isEditing ? editedItem.itemCode:newItemCode} 
                    onChange={isEditing ? handleEditInputItemCode :handleItemCodeChange} 
                    placeholder='Item Code' />
            </div>
            <div>
              <input type="text" 
                    value={isEditing ? editedItem.itemDescription:newItemDesc} 
                    onChange={isEditing ? handleEditInputItemDesc :handleItemDescChange} 
                    placeholder='Item Description' />
            </div>
            <div>
              <input type="text" 
                    value={isEditing ? editedItem.inventoryUoM:newItemUom} 
                    onChange={isEditing ? handleEditInputUoM :handleInventoryUoMChange} 
                    placeholder='Item UoM' />
            </div>
            <div>
              <input type="number" 
                    value={isEditing ? editedItem.price:newItemPrice} 
                    onChange={isEditing ? handleEditInputPrice :handlePriceChange} 
                    placeholder='Price' />
            </div>
            <div>
              <input type="number" 
                    value={isEditing ? editedItem.InStock:newItemInStock} 
                    onChange={isEditing ? handleEditInputInStock :handleInStockChange} 
                    placeholder='InStock' />
            </div>
            <div>
              <input type="number" 
                    value={isEditing ? editedItem.MinStock:newItemMinStock} 
                    onChange={isEditing ? handleEditInputMinStock :handleMinStockChange} 
                    placeholder='MinStock' />
            </div>
            <div>
              <input type="number" 
                    value={isEditing ? editedItem.MaxStock:newItemMaxStock} 
                    onChange={isEditing ? handleEditInputMaxStock :handleMaxStockChange} 
                    placeholder='MaxStock' />
            </div>
            <button type='submit' onClick={updateSelectedItems}>Save</button>
            <button type='button'>Cancel</button>
          </form>
        </div>
      </div>

  )
}

export default ItemForm