'use client';
import React, { useEffect, useState } from 'react';

interface CryptoTableProps {
  data: any[];
  loading: boolean;
  error: string | null;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data, loading, error }) => {
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      setTableData(data);
    }
  }, [loading, error, data]);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <div className="max-w-4xl w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 text-center">Symbol</th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">Price</th>
              <th className="py-3 px-4 border-b border-gray-200 text-center">Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tableData.length > 0 ? (
              tableData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-center">{item.symbol}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">{item.price}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-3 px-4 text-center text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
