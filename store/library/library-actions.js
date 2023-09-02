import http from "services/httpService";
import { libraryActions } from "./library-slice";
import { toast } from "react-hot-toast";


export const fetchUserLibraries = () => {
    return async (dispatch) => {
        try {
            dispatch(libraryActions.fetchUserLibrariesStart());

            const res = await http.get('/libraries');

            dispatch(libraryActions.fetchUserLibrariesSuccess(res.data.data));
        } catch (error) {
            dispatch(libraryActions.fetchUserLibrariesFailure(error.message));
        }
    };
};

export const updateLibraryByIdAsync = (id, updatedData) => {
    return async (dispatch) => {
        try {

            const res = await http.patch(`/libraries/${id}`, updatedData);

            dispatch(libraryActions.updateLibraryById({ id, updatedData: res.data.data }));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addNewLibraryAsync = (newLibraryData) => {
    return async (dispatch) => {
        try {

            const res = await http.post('/libraries', newLibraryData);
            toast.success("new library added")
            dispatch(libraryActions.addNewLibrary(res.data.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteLibraryByIdAsync = (id) => {
    return async (dispatch) => {
        try {

            await http.delete(`/libraries/${id}`);

            dispatch(libraryActions.deleteLibraryById(id));
        } catch (error) {
            console.log(error);
        }
    };
};