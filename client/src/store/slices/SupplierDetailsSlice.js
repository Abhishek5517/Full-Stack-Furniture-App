
import { createSlice } from '@reduxjs/toolkit';

const SupplierDetailsSlice = createSlice({
    name: 'supplierDetail',
    initialState: {
        supplierDetails: [],
        editId: -1
    },
    reducers: {
          addSupplierDetails: (state, action) => {
            let data = action.payload.data;
            state.supplierDetails.push(data);
        },
        removeSupplierDetails:(state,action) => {
            let id = action.payload.id ;
            state.supplierDetails.splice(id,1);
        }
    },
})
let SupplierDetailsSliceReducer = SupplierDetailsSlice.reducer
export default SupplierDetailsSliceReducer;

export const { addSupplierDetails, removeSupplierDetails  } = SupplierDetailsSlice.actions; 