import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Electronics', slug: 'electronics', productsCount: 124, status: 'Active' },
  { id: 2, name: 'Fashion', slug: 'fashion', productsCount: 356, status: 'Active' },
  { id: 3, name: 'Home & Furniture', slug: 'home-furniture', productsCount: 89, status: 'Active' },
  { id: 4, name: 'Beauty', slug: 'beauty', productsCount: 45, status: 'Draft' },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleEdit = (id: number) => {
    alert(`Editing Category ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Categories</h1>
        <button className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-nexora-gold hover:bg-nexora-goldLight focus:outline-none transition-colors">
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Category
        </button>
      </div>

      <div className="bg-nexora-darkest shadow overflow-hidden border border-gray-800 sm:rounded-lg">
        <div className="p-4 border-b border-gray-800">
          <div className="relative rounded-md shadow-sm max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-nexora-dark text-gray-300 placeholder-gray-500 focus:outline-none focus:border-nexora-gold focus:ring-1 focus:ring-nexora-gold sm:text-sm transition-colors"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-nexora-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-nexora-darkest">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{cat.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{cat.productsCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cat.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(cat.id)} className="text-gray-400 hover:text-nexora-gold mr-3"><Edit className="h-5 w-5" /></button>
                    <button onClick={() => handleDelete(cat.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="h-5 w-5" /></button>
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

export default Categories;
