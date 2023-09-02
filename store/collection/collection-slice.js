import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const collection = createSlice({
    name: 'collection',
    initialState: {
        library: {},
        loading: false,
        error: null,
    },
    reducers: {
        fetchLibraryCollectionStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchLibraryCollectionSuccess(state, action) {
            state.library[action.payload.libId] = action.payload.collections;
            state.loading = false;
            state.error = null;
        },
        fetchLibraryCollectionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addNewCollection(state, action) {
            const { libraryId, collectionData } = action.payload;

            if (!state.library[libraryId]) {
                state.library[libraryId] = []; // Initialize the collections array for the library if it doesn't exist
            }

            state.library[libraryId].push(collectionData);
        },
        updateCollection(state, action) {
            const { libraryId, collectionId, updatedData } = action.payload;

            const collectionsArray = state.library[libraryId];
            if (collectionsArray) {
                const collectionToUpdate = collectionsArray.find(collection => collection.id === collectionId);
                if (collectionToUpdate) {
                    // Update the collection with the provided ID
                    Object.assign(collectionToUpdate, updatedData);
                }
            }
        },
        deleteCollectionById(state, action) {
            const { libraryId, collectionId } = action.payload;

            const collectionsArray = state.library[libraryId];
            if (collectionsArray) {
                state.library[libraryId] = collectionsArray.filter(collection => collection.id !== collectionId);
            }
        },
        addNoteToCollectionStart(state) {
            state.loading = true;
            state.error = null;
        },
        addNoteToCollectionSuccess(state, action) {
            const { libraryId, collectionId, noteData } = action.payload;
            const collections = state.library[libraryId];

            if (collections) {
                const collection = collections.find(collection => collection.id === collectionId);

                if (collection) {
                    collection.notes.push(noteData);
                }
            }

            state.loading = false;
            state.error = null;
        },
        addNoteToCollectionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const collectionActions = collection.actions;

export default collection;
