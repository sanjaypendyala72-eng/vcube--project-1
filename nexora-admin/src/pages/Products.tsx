import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

// Mock data for presentation
const initialProducts = [
  { id: 1, name: 'Premium Wireless Headphones', sku: 'AUDIO-001', price: '₹14,999', stock: 45, status: 'Active', category: 'Electronics' },
  { id: 2, name: 'Ergonomic Office Chair', sku: 'FURN-042', price: '₹8,499', stock: 12, status: 'Active', category: 'Home & Furniture' },
  { id: 3, name: 'Mechanical Keyboard V2', sku: 'COMP-105', price: '₹6,299', stock: 0, status: 'Out of Stock', category: 'Electronics' },
  { id: 4, name: 'Minimalist Desk Lamp', sku: 'LIGHT-022', price: '₹1,299', stock: 156, status: 'Active', category: 'Home & Furniture' },
  { id: 5, name: 'Cotton Summer T-Shirt', sku: 'APP-093', price: '₹799', stock: 89, status: 'Draft', category: 'Fashion' },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/products/edit/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Products</h1>
        <button 
          onClick={() => navigate('/products/new')}
          className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-nexora-gold hover:bg-nexora-goldLight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-nexora-dark focus:ring-nexora-gold transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Product
        </button>
      </div>

      <div className="bg-nexora-darkest shadow overflow-hidden border border-gray-800 sm:rounded-lg">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="relative rounded-md shadow-sm max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-nexora-dark text-gray-300 placeholder-gray-500 focus:outline-none focus:border-nexora-gold focus:ring-1 focus:ring-nexora-gold sm:text-sm transition-colors"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="ml-4 flex items-center px-4 py-2 rounded-xl border border-white/20 bg-[#121212] text-gray-200 hover:text-white hover:border-white/40 transition-all font-medium text-sm"
              style={{ boxShadow: "0px 0px 4px rgba(255,255,255,0.05)" }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-nexora-dark">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-nexora-darkest">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-700 rounded-md"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.status === 'Active' ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                      ) : product.status === 'Out of Stock' ? (
                        <XCircle className="h-4 w-4 text-red-500 mr-1.5" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-gray-500 mr-2.5 ml-1" />
                      )}
                      <span className="text-sm text-gray-300">{product.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => handleEdit(product.id)}
                        className="text-gray-400 hover:text-nexora-gold transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No products found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="bg-nexora-dark border-t border-gray-800 px-4 py-3 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{filteredProducts.length}</span> of <span className="font-medium text-white">{products.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-nexora-darkest text-sm font-medium text-gray-400 hover:bg-gray-800">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-nexora-darkest text-sm font-medium text-white hover:bg-gray-800">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-nexora-darkest text-sm font-medium text-gray-400 hover:bg-gray-800">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col h-full animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              <div>
                <h3 className="text-sm font-semibold text-nexora-gold uppercase tracking-widest mb-4">Category</h3>
                <div className="space-y-3">
                  {['All', 'Electronics', 'Fashion', 'Home & Furniture', 'Beauty'].map(cat => (
                    <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                      <input type="radio" name="category" className="form-radio text-nexora-gold bg-black/50 border-white/20 focus:ring-nexora-gold" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-nexora-gold uppercase tracking-widest mb-4">Status</h3>
                <div className="space-y-3">
                  {['Any', 'Active', 'Draft', 'Out of Stock'].map(status => (
                    <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                      <input type="checkbox" className="form-checkbox rounded text-nexora-gold bg-black/50 border-white/20 focus:ring-nexora-gold" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-nexora-gold uppercase tracking-widest mb-4">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <input type="number" placeholder="Min" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-nexora-gold" />
                  <span className="text-gray-500">-</span>
                  <input type="number" placeholder="Max" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-nexora-gold" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex space-x-4 bg-[#050505]">
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 px-4 py-2 border border-white/20 rounded-xl text-gray-300 hover:bg-white/5 transition-colors font-medium">
                Reset
              </button>
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-nexora-gold to-[#fbf5b7] text-black hover:scale-105 transition-transform font-bold">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
