import { useState } from 'react';
import { Search, Edit, Eye, Filter } from 'lucide-react';

const initialOrders = [
  { id: 'ORD-7291', customer: 'John Doe', date: '2026-09-24', total: '₹4,599', status: 'Processing' },
  { id: 'ORD-7290', customer: 'Jane Smith', date: '2026-09-23', total: '₹12,999', status: 'Shipped' },
  { id: 'ORD-7289', customer: 'Alice Johnson', date: '2026-09-23', total: '₹899', status: 'Delivered' },
  { id: 'ORD-7288', customer: 'Bob Williams', date: '2026-09-22', total: '₹2,150', status: 'Pending' },
];

const Orders = () => {
  const [orders] = useState(initialOrders);

  const handleEdit = (id: string) => {
    alert(`Updating status for Order: ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Orders</h1>
      </div>

      <div className="bg-nexora-darkest shadow overflow-hidden border border-gray-800 sm:rounded-lg">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="relative rounded-md shadow-sm max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-nexora-dark text-gray-300 placeholder-gray-500 focus:outline-none focus:border-nexora-gold sm:text-sm"
              placeholder="Search by Order ID or Customer..."
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-nexora-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-nexora-darkest">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-white mr-3"><Eye className="h-5 w-5" /></button>
                    <button onClick={() => handleEdit(order.id)} className="text-gray-400 hover:text-nexora-gold"><Edit className="h-5 w-5" /></button>
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

export default Orders;
