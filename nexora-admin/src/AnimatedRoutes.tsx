
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import { Promotions, Reviews, SettingsPage } from './pages/Placeholders';
import { PageTransition } from './components/PageTransition';

export const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        
        {/* Protected Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="products/new" element={<PageTransition><ProductForm /></PageTransition>} />
          <Route path="products/edit/:id" element={<PageTransition><ProductForm /></PageTransition>} />
          <Route path="categories" element={<PageTransition><Categories /></PageTransition>} />
          <Route path="orders" element={<PageTransition><Orders /></PageTransition>} />
          <Route path="customers" element={<PageTransition><Customers /></PageTransition>} />
          <Route path="promotions" element={<PageTransition><Promotions /></PageTransition>} />
          <Route path="reviews" element={<PageTransition><Reviews /></PageTransition>} />
          <Route path="settings" element={<PageTransition><SettingsPage /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
