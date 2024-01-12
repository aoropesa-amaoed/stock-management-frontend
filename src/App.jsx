import { useState, useEffect } from 'react';
import './App.css';
import itemService from "./services/items.js";
import ItemList from './components/ItemList.jsx';
import ItemForm from './components/ItemForm.jsx';

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
      <ItemList
        items={items}
        selectedItems={selectedItems}
        handleCheckboxChange={handleCheckboxChange}
      />
      <ItemForm addItems={addItems}
      isEditing={isEditing}
      newItemCode={newItemCode}
      handleEditInputItemCode={handleEditInputItemCode}
      handleItemCodeChange={handleItemCodeChange}
      newItemDesc={newItemDesc}
      handleEditInputItemDesc={handleEditInputItemDesc}
      handleItemDescChange={handleItemDescChange}
      newItemUom={newItemUom}
      handleEditInputUoM={handleEditInputUoM}
      handleInventoryUoMChange={handleInventoryUoMChange}
      newItemPrice={newItemPrice}
      handleEditInputPrice={handleEditInputPrice}
      handlePriceChange={handlePriceChange}
      newItemInStock={newItemInStock}
      handleEditInputInStock={handleEditInputInStock}
      handleInStockChange={handleInStockChange}
      newItemMinStock={newItemMinStock}
      handleEditInputMinStock={handleEditInputMinStock}
      handleMinStockChange={handleMinStockChange}
      newItemMaxStock={newItemMaxStock}
      handleEditInputMaxStock={handleEditInputMaxStock}
      handleMaxStockChange={handleMaxStockChange}
      updateSelectedItems={updateSelectedItems}
      editedItem={editedItem}
      />
    </>
  );
}
  

export default App;
