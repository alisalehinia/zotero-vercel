import http from "services/httpService";
import { collectionActions } from "./collection-slice";
import { toast } from "react-hot-toast";


export const fetchLibraryCollections = (libraryId) => {
    return async (dispatch) => {
        try {
            dispatch(collectionActions.fetchLibraryCollectionStart());

            // Make API call here to fetch the user's libraries
            const res = await http.get(`/libraries/${libraryId}/collections`); // Replace with your actual API endpoint

            dispatch(collectionActions.fetchLibraryCollectionSuccess({ collections: res.data.data, libId: libraryId }));
        } catch (error) {
            dispatch(collectionActions.fetchLibraryCollectionFailure(error.message));
        }
    };
};

export const addNewCollectionAsync = (libraryId, collectionData) => {
    return async (dispatch) => {
        try {
            // Make API call here to add the new collection within the library
            const res = await http.post(`/libraries/${libraryId}/collections`, collectionData); // Replace with your actual API endpoint and request data

            dispatch(collectionActions.addNewCollection({ libraryId, collectionData: res.data.data }));
            toast.success("add new collection")
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateCollectionAsync = (libraryId, collectionId, updatedData) => {
    return async (dispatch) => {
        try {
            // Make API call here to update the collection within the library
            const res = await http.patch(`/collections/${collectionId}`, updatedData); // Replace with your actual API endpoint and request data

            dispatch(collectionActions.updateCollection({ libraryId, collectionId, updatedData: res.data.data }));
            toast.success("update library")
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteCollectionByIdAsync = (libraryId, collectionId) => {
    return async (dispatch) => {
        try {
            // Make API call here to delete the collection within the library
            await http.delete(`/collections/${collectionId}`); // Replace with your actual API endpoint

            dispatch(collectionActions.deleteCollectionById({ libraryId, collectionId }));
            toast.success("delete collection")
        } catch (error) {
            console.log(error);

        }
    };
};

export const addNoteToCollectionAsync = (libraryId, collectionId, noteData) => {
    return async (dispatch, getState) => {
        try {
            dispatch(collectionActions.addNoteToCollectionStart());

            const collections = getState().collection.library[libraryId];

            if (collections) {
                const collection = collections.find(collection => collection.id === collectionId);

                if (collection) {
                    const response = await http.post(`/collections/${collectionId}/notes`, noteData);

                    dispatch(collectionActions.addNoteToCollectionSuccess({ libraryId, collectionId, noteData: response.data.data }));
                    toast.success("add note success")
                }
            }
        } catch (error) {
            dispatch(collectionActions.addNoteToCollectionFailure(error.message));
        }
    };
};
