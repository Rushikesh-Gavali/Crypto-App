import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchCryptoPrices } from '../../utils/api';

interface CryptoState {
  symbol: string;
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  symbol: 'bitcoin',
  data: [],
  loading: false,
  error: null,
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchData',
  async (symbol: string) => {
    const response = await fetchCryptoPrices(symbol);
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setSymbol } = cryptoSlice.actions;

export const selectCrypto = (state: RootState) => state.crypto;

export default cryptoSlice.reducer;
