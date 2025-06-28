import { useEffect, useState } from "react";
import axios from "axios";

interface SalesSummary {
  totalSales: number;
  totalPurchases: number;
  totalPaymentsReceived: number;
  totalPaymentsGiven: number;
  totalSaleReturns: number;
  recentTransactions: {
    invoiceType: string;
    total: number;
    createdAt: string;
  }[];
}

const DashboardPage = () => {
  const [summary, setSummary] = useState<SalesSummary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/invoice/summary"
        );
        setSummary(response.data.data);
        console.log("Summary data:", response.data.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl">₹{summary.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Purchases</h2>
          <p className="text-2xl">₹{summary.totalPurchases.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Net Payments</h2>
          <p className="text-2xl">
            ₹
            {(
              summary.totalPaymentsReceived - summary.totalPaymentsGiven
            ).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.recentTransactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">{transaction.invoiceType}</td>
                  <td className="px-6 py-4">₹{transaction.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
