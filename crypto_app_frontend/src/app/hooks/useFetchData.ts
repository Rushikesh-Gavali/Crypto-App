import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchCryptoData } from '../store/slices/cryptoSlice';

const useFetchData = () => {
  const dispatch = useAppDispatch();
  const { symbol, data, loading, error } = useAppSelector(state => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchCryptoData(symbol));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return { data, loading, error };
};

export default useFetchData;
