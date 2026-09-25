import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'Electronics',
    brand: '',
    sku: '',
    price: '',
    salePrice: '',
    stock: '',
    lowStockThreshold: '5',
    status: 'Draft',
    featured: false,
    newArrival: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Saving product:', formData);
    alert('Product saved successfully!');
    navigate('/products');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/products')}
            className="p-2 bg-nexora-darkest border border-gray-800 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-white">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate('/products')}
            className="px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-nexora-darkest hover:bg-gray-800 focus:outline-none transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-nexora-gold hover:bg-nexora-goldLight focus:outline-none transition-colors"
          >
            <Save className="-ml-1 mr-2 h-5 w-5" />
            Save Product
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-nexora-darkest shadow border border-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="Enter product name" />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="product-url-slug" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300">Short Description</label>
                <textarea name="shortDescription" rows={2} value={formData.shortDescription} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="Brief summary" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300">Full Description</label>
                <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="Detailed product description..." />
              </div>
            </div>
          </div>

          <div className="bg-nexora-darkest shadow border border-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Media</h2>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
              <div className="mt-4 flex text-sm text-gray-400 justify-center">
                <label className="relative cursor-pointer rounded-md font-medium text-nexora-gold hover:text-nexora-goldLight focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Organization */}
        <div className="space-y-6">
          <div className="bg-nexora-darkest shadow border border-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Pricing & Inventory</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Sale Price (₹) - Optional</label>
              <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">SKU</label>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="PROD-001" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Low Stock At</label>
                <input type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="5" />
              </div>
            </div>
          </div>

          <div className="bg-nexora-darkest shadow border border-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-medium text-white border-b border-gray-800 pb-2">Organization</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold">
                <option>Active</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold">
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Furniture</option>
                <option>Beauty</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full border border-gray-700 rounded-md bg-nexora-dark text-white px-3 py-2 focus:ring-nexora-gold focus:border-nexora-gold" placeholder="Brand name" />
            </div>

            <div className="space-y-4 pt-2 border-t border-gray-800">
              <div className="flex items-center">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-nexora-gold focus:ring-nexora-gold border-gray-700 rounded bg-nexora-dark" />
                <label className="ml-2 block text-sm text-gray-300">Featured Product</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} className="h-4 w-4 text-nexora-gold focus:ring-nexora-gold border-gray-700 rounded bg-nexora-dark" />
                <label className="ml-2 block text-sm text-gray-300">New Arrival</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
