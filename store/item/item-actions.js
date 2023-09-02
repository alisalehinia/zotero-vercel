import http from "services/httpService";
import { itemActions } from "./item-slice";
import { toast } from "react-hot-toast";


export const fetchCollectionItems = (collectionId) => {
    return async (dispatch) => {
        try {
            dispatch(itemActions.fetchCollectionsItemsStart());

            // Make API call here to fetch the user's libraries
            const res = await http.get(`/collections/${collectionId}/items`); // Replace with your actual API endpoint

            dispatch(itemActions.fetchCollectionsItemsSuccess({ items: res.data.data, colId: collectionId }));
        } catch (error) {
            dispatch(itemActions.fetchCollectionItemsFailure(error.message));
        }
    };
};

export const addNewItemAsync = (collectionId, itemData) => {
    return async (dispatch) => {
        try {
            // Make API call here to add the new item to the collection
            const res = await http.post(`/collections/${collectionId}/items`, itemData); // Replace with your actual API endpoint and request data

            dispatch(itemActions.addNewItem({ collectionId, itemData: res.data.data }));
            toast("new item added")
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateItemAsync = (collectionId, itemId, updatedData) => {
    return async (dispatch) => {
        try {
            // Make API call here to update the item within the collection
            const res = await http.patch(`/items/${itemId}`, updatedData); // Replace with your actual API endpoint and request data

            dispatch(itemActions.updateItem({ collectionId, itemId, updatedData: res.data.data }));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteItemAsync = (collectionId, itemId) => {
    return async (dispatch) => {
        try {
            // Make API call here to delete the item from the collection
            await http.delete(`/items/${itemId}`); // Replace with your actual API endpoint

            dispatch(itemActions.deleteItem({ collectionId, itemId }));
        } catch (error) {
            console.log(error);
        }
    };
};

// Add note to item by id
export const addNoteToItemAsync = (collectionId, itemId, note) => {
    return async (dispatch) => {
        try {
            console.log(note);
            // Make API call here to add the note to the item
            const res = await http.post(`/items/${itemId}/notes`, { text: note.text });
            // Replace with your actual API endpoint and request data

            dispatch(itemActions.addNoteToItem({ collectionId, itemId, note: res.data.data }));
        } catch (error) {
            console.log("error", error);
        }
    };
};