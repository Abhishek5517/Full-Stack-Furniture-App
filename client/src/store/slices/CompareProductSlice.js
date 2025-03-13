
import { createSlice } from '@reduxjs/toolkit';

const CompareProductSlice = createSlice({
    name: 'compareProduct',
    initialState: {
        compareList: [],
        editId: -1
    },
    reducers: {
          addToCompareList: (state, action) => {
            let data = action.payload.data;
            state.compareList.push(data);
        },
        removeFromCompareList : (state, action) =>{
            let id = action.payload.id ;
            console.log(id);
            console.log(state.compareList[0]);
            state.compareList.splice(id,1) ;
            
        }
    },
})
let CompareProductSliceReducer = CompareProductSlice.reducer
export default CompareProductSliceReducer;

export const { addToCompareList, removeFromCompareList } = CompareProductSlice.actions; 