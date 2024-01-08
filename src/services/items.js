import axios from "axios";

const baseUrl = "/items";

//get all items
async function getItems(){
    const res = await axios.get(baseUrl);
    return res.data;
}
//add item
async function addItems(itemObject){
    const res = await axios.post(baseUrl, itemObject);
    return res.data
};

//add item
async function deleteItem(id){
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res;
};
//update item
async function updateItem(id, updatedItem){
    const res = await axios.put(`${baseUrl}/${id}`,updatedItem);
    return res.data;
}
export default {
    getItems,
    addItems,
    deleteItem,
    updateItem,
}