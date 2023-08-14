import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import PageNav from './components/PageNav';
import AppLayout from './pages/AppLayout';
import AppNav from './components/AppNav';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageNav />}>
          <Route index element={<HomePage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
        </Route>

        <Route path='app' element={<AppNav />}>
          <Route index element={<AppLayout />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
