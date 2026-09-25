import { useState } from 'react';
import { Search, Edit, Ban } from 'lucide-react';

const initialCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: '₹45,200', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: '₹12,999', status: 'Active' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', orders: 1, spent: '₹899', status: 'Active' },
  { id: 4, name: 'Suspicious User', email: 'spam@example.com', orders: 0, spent: '₹0', status: 'Suspended' },
];

const Customers = () => {
  const [customers] = useState(initialCustomers);

  const handleEdit = (id: number) => {
    alert(`Editing Customer ID: ${id}`);
  };

  const handleSuspend = (id: number) => {
    if (window.confirm('Suspend this customer account?')) {
      alert(`Suspended Customer ID: ${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Customers</h1>
      </div>

      <div className="bg-nexora-darkest shadow overflow-hidden border border-gray-800 sm:rounded-lg">
        <div className="p-4 border-b border-gray-800">
          <div className="relative rounded-md shadow-sm max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-nexora-dark text-gray-300 placeholder-gray-500 focus:outline-none focus:border-nexora-gold sm:text-sm"
              placeholder="Search customers..."
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-nexora-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-nexora-darkest">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{cust.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{cust.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cust.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cust.spent}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cust.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(cust.id)} className="text-gray-400 hover:text-nexora-gold mr-3"><Edit className="h-5 w-5" /></button>
                    <button onClick={() => handleSuspend(cust.id)} className="text-gray-400 hover:text-red-500"><Ban className="h-5 w-5" /></button>
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

export default Customers;
