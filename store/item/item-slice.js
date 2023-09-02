import { createSlice } from '@reduxjs/toolkit';

const item = createSlice({
    name: 'item',
    initialState: {
        itemsOfCollections: {},
        loading: false,
        error: null,
    },
    reducers: {
        fetchCollectionsItemsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCollectionsItemsSuccess(state, action) {
            state.itemsOfCollections[action.payload.colId] = action.payload.items;
            state.loading = false;
            state.error = null;
        },
        fetchCollectionItemsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addNewItem(state, action) {
            const { collectionId, itemData } = action.payload;

            if (!state.itemsOfCollections[collectionId]) {
                state.itemsOfCollections[collectionId] = []; // Initialize the items array for the collection if it doesn't exist
            }

            state.itemsOfCollections[collectionId].push(itemData);
        },
        updateItem(state, action) {
            const { collectionId, itemId, updatedData } = action.payload;

            const itemsArray = state.itemsOfCollections[collectionId];
            if (itemsArray) {
                const itemToUpdate = itemsArray.find(item => item.id === itemId);
                if (itemToUpdate) {
                    // Update the item with the provided ID
                    Object.assign(itemToUpdate, updatedData);
                }
            }
        },
        deleteItem(state, action) {
            const { collectionId, itemId } = action.payload;

            const itemsArray = state.itemsOfCollections[collectionId];
            if (itemsArray) {
                const index = itemsArray.findIndex((item) => item.id === itemId);
                if (index !== -1) {
                    // Remove the item from the array
                    itemsArray.splice(index, 1);
                }
            }
        },
    },
    // Add note to item by id
    addNoteToItem(state, action) {
        const { collectionId, itemId, note } = action.payload;
        const itemsArray = state.itemsOfCollections[collectionId];
        if (itemsArray) {
            const itemToUpdate = itemsArray.find(item => item.id === itemId);
            if (itemToUpdate) {
                // Add the note to the item with the provided ID
                if (!itemToUpdate.notes) {
                    itemToUpdate.notes = []; // Initialize the notes array for the item if it doesn't exist
                }
                itemToUpdate.notes.push([...note]);
            }
        }
    },
});

export const itemActions = item.actions;

export default item;
