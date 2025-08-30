import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export interface MasterState {
  masterListdata: any[];
  loading: 'idle' | 'pending';
  error: string | null;
}


export const fetchMasterData = createAsyncThunk('master/resMaster', async (_, { rejectWithValue }) => {
  try {
    const responce = await api.get('resMaster');
    const datas = responce.data ? responce.data : {};
    console.log(datas)
    return datas;
  } catch (error: any) {
    console.error('Error', error.message);
    return rejectWithValue(error.message);
  }
});


const initialState: MasterState = {
  masterListdata: [],
  loading: 'idle',
  error: null,
};

const masterSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    clearMasterData: state => {
      state.masterListdata = []; // Clears Redux state properly
    },
  },
  extraReducers: builder => {
    // Fetch Sight Year actions
    builder
      .addCase(fetchMasterData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.masterListdata = action.payload;
      })
      .addCase(fetchMasterData.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchMasterData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = 'Fetch failed';
      });
  },
});

export const { clearMasterData } = masterSlice.actions;
export default masterSlice.reducer;

