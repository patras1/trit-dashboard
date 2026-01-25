import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProductsPage } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { CoachesPage } from './pages/Coaches';
import { ClientsPage } from './pages/Clients';
import { SettingsPage } from './pages/Settings';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { DirectionProvider } from './contexts/DirectionContext';
import { RequireAuth } from './components/auth/RequireAuth';
import './i18n';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DirectionProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:barcode" element={<ProductDetails />} />
              <Route path="coaches" element={<CoachesPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </DirectionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
