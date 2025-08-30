import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export interface StockState {
  stockListdata: any[];
  loading: 'idle' | 'pending';
  error: string | null;
}

// Define types for request and response
interface StockRequest {
  data: any; // you can replace `any` with a stricter type
}

interface StockResponse {
  [key: string]: any; // replace with actual API response type
}

export const fetchStockData = createAsyncThunk<
  StockResponse, // return type
  StockRequest, // argument type
  { rejectValue: string } // reject type
>('stock/fetchStockData', async ({ data }, { rejectWithValue }) => {
  try {
    const responce = await api.post('adinathApp', data);
    const datas = responce.data ? responce.data : {};    
    return datas;
  } catch (error: any) {
    console.error('Error', error.message);
    return rejectWithValue(error.message);
  }
});

const initialState: StockState = {
  stockListdata: [],
  loading: 'idle',
  error: null,
};

const stockSlice = createSlice({
  name: 'stockData',
  initialState,
  reducers: {
    clearStockData: state => {
      state.stockListdata = []; // Clears Redux state properly
    },
  },
  extraReducers: builder => {
    // Fetch Sight Year actions
    builder
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.stockListdata = action.payload.StoneList;
      })
      .addCase(fetchStockData.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = 'Fetch failed';
      });
  },
});

export const { clearStockData } = stockSlice.actions;
export default stockSlice.reducer;
