import { createSlice } from '@reduxjs/toolkit';

const librarySlice = createSlice({
    name: 'library',
    initialState: {
        libraries: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchUserLibrariesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserLibrariesSuccess(state, action) {
            state.libraries = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchUserLibrariesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateLibraryById(state, action) {
            const { id, updatedData } = action.payload;
            console.log("updateLibraryById=>", id);

            const libraryToUpdate = state.libraries.find(library => library.id === id);
            if (libraryToUpdate) {
                // Update the library with the provided ID
                Object.assign(libraryToUpdate, updatedData);
            }
        },
        addNewLibrary(state, action) {
            const newLibrary = action.payload;
            state.libraries.push(newLibrary);
        },
        deleteLibraryById(state, action) {
            const id = action.payload;
            state.libraries = state.libraries.filter(library => library.id !== id);
        },
    },
});

export const libraryActions = librarySlice.actions;

export default librarySlice;
