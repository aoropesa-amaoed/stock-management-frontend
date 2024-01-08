import { useState, useEffect } from 'react';
import './App.css';
import itemService from "./services/items.js";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({
      itemCode: "",
      itemDescription: "",
      inventoryUoM: "",
      price: "",
      InStock: "",
      MinStock: "",
      MaxStock: "",
});

// State variables for the new item form
  const [newItemCode, setNewItemCode] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemUom, setNewItemUom] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemInStock, setNewInStock] = useState("");
  const [newItemMinStock, setNewItemMinStock] = useState("");
  const [newItemMaxStock, setNewItemMaxStock] = useState("");

  useEffect(() => {
    // call the getItems function to get all items
    itemService.getItems().then(initialItems => setItems(initialItems));
  }, []);

  const addItems = (event) => {
   event.preventDefault();
 
    const itemObject = {
      itemCode: newItemCode,
      itemDescription: newItemDesc,
      inventoryUoM: newItemUom,
      price: newItemPrice,
      InStock: newItemInStock,
      MinStock: newItemMinStock,
      MaxStock: newItemMaxStock,
    };
    // Call the addItems function from the service
    itemService.addItems(itemObject).then((returnedItems) => {
      setItems(items.concat(returnedItems));
    });

    // Reset the form inputs
    setNewItemCode("");
    setNewItemDesc("");
    setNewItemUom("");
    setNewItemPrice("");
    setNewInStock("");
    setNewItemMinStock("");
    setNewItemMaxStock("");
  };

//edit function
const handleSubmit = (event) => {
  event.preventDefault();
  
  if (isEditing) {
    itemService.updateItem(editedItem.id, editedItem)
      .then(() => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editedItem.id ? { ...item, ...editedItem } : item
          )
        );
        setIsEditing(false);
        setEditingItemId(null);
        setEditedItem({
          itemCode: "",
          itemDescription: "",
          inventoryUoM: "",
          price: "",
          InStock: "",
          MinStock: "",
          MaxStock: "",
        });
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        // Handle error (e.g., show an error message)
      });
  } else {
    addItems();
  }
}
 
  //delete function
const deleteSelectedItem = (id)=>{
    Promise.all(selectedItems.map(itemId => itemService.deleteItem(itemId)))
    .then(()=>{
      setItems(items.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    });
   };

const updateSelectedItems = () => {
    // Call the updateItem function for the selected item
    itemService.updateItem(editedItem.id, editedItem)
      .then(() => {
        // Update the local state with the edited item
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editedItem.id ? { ...item, ...editedItem } : item
          )
        );
        // Clear editing status and selected items
        setIsEditing(false);
        setSelectedItems([]);
      })
     
  };
  

  // Event handlers for form input changes
  const handleItemCodeChange = (event) => {
    setNewItemCode(event.target.value);
  };
  const handleItemDescChange = (event) => {
    setNewItemDesc(event.target.value);
  };
  const handleInventoryUoMChange = (event) => {
    setNewItemUom(event.target.value);
  };
  const handlePriceChange = (event) => {
    setNewItemPrice(event.target.value);
  };
  const handleInStockChange = (event) => {
    setNewInStock(event.target.value);
  };
  const handleMinStockChange = (event) => {
    setNewItemMinStock(event.target.value);
  };
  const handleMaxStockChange = (event) => {
    setNewItemMaxStock(event.target.value);
  };

  //event handlers for editing
   const handleEditInputItemCode = (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,
      itemCode: event.target.value,
    }));
  };
  const handleEditInputItemDesc = (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      itemDescription:event.target.value,
    }));
  };
  const handleEditInputUoM = (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      inventoryUoM:event.target.value,
    }));
  };
  const handleEditInputPrice = (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      price:event.target.value,
    }));
  };
  const handleEditInputInStock= (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      InStock:event.target.value,
    }));
  };
  const handleEditInputMinStock= (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      MinStock:event.target.value,
    }));
  };
  const handleEditInputMaxStock= (event) => {
    setEditedItem((prevEditedItem) => ({
      ...prevEditedItem,      
      MaxStock:event.target.value,
    }));
  };
  //handler for edit
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Deselect the item
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Clear other selected items when editing a single item
        setSelectedItems([itemId]);
        // Enable editing for the selected item
        setIsEditing(true);
        setEditingItemId(itemId);
        // Load item details for editing
        const selectedItem = items.find((item) => item.id === itemId);
        setEditedItem({ ...selectedItem });
        return [itemId];
      }
    });
  };

  return (
    <>
      <div>
        <h1>Inventory Items</h1>
      </div>
      <div>
        <button onClick={()=> updateSelectedItems()}>Edit</button>
      </div>
      <div>
        <button onClick={deleteSelectedItem}>Delete</button>
      </div>
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
      <div>
        <div>
          <h3>Add Items</h3>
        </div>
        <div>
          <form onSubmit= {addItems}>
            <div>
              <input type="text" value={isEditing ? editedItem.itemCode:newItemCode} onChange={isEditing ? handleEditInputItemCode :handleItemCodeChange} placeholder='Item Code' />
            </div>
            <div>
              <input type="text" value={isEditing ? editedItem.itemDescription:newItemDesc} onChange={isEditing ? handleEditInputItemDesc :handleItemDescChange} placeholder='Item Description' />
            </div>
            <div>
              <input type="text" value={isEditing ? editedItem.inventoryUoM:newItemUom} onChange={isEditing ? handleEditInputUoM :handleInventoryUoMChange} placeholder='Item UoM' />
            </div>
            <div>
              <input type="number" value={isEditing ? editedItem.price:newItemPrice} onChange={isEditing ? handleEditInputPrice :handlePriceChange} placeholder='Price' />
            </div>
            <div>
              <input type="number" value={isEditing ? editedItem.InStock:newItemInStock} onChange={isEditing ? handleEditInputInStock :handleInStockChange} placeholder='InStock' />
            </div>
            <div>
              <input type="number" value={isEditing ? editedItem.MinStock:newItemMinStock} onChange={isEditing ? handleEditInputMinStock :handleMinStockChange} placeholder='MinStock' />
            </div>
            <div>
              <input type="number" value={isEditing ? editedItem.MaxStock:newItemMaxStock} onChange={isEditing ? handleEditInputMaxStock :handleMaxStockChange} placeholder='MaxStock' />
            </div>
            <button type='submit' onClick={updateSelectedItems}>Save</button>
            <button type='button'>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}
  

export default App;

