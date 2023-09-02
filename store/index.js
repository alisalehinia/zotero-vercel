import { configureStore } from '@reduxjs/toolkit';

import librarySlice from './library/library-slice';
import collectionSlice from './collection/collection-slice';
import itemSlice from './item/item-slice';

const store = configureStore({
    reducer: {
        library: librarySlice.reducer,
        collection: collectionSlice.reducer,
        item: itemSlice.reducer
    },
});

export default store;