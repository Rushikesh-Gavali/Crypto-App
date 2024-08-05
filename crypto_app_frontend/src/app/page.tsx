'use client';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchCryptoData, selectCrypto } from "@/app/store/slices/cryptoSlice";
import CryptoTable from "@/app/components/CryptoTable";
import Modal from "@/app/components/Modal";

export default function Home() {
  const dispatch = useAppDispatch();
  const { symbol, data, loading, error } = useAppSelector(selectCrypto);

  useEffect(() => {
    dispatch(fetchCryptoData(symbol));
    const interval = setInterval(() => {
      dispatch(fetchCryptoData(symbol));
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Real-time Crypto Price Dashboard
      </h1>
      <CryptoTable data={data} loading={loading} error={error} />
      <Modal />
    </main>
  );
}
