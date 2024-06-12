import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toolbar, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';
import CatalogPage from './pages/CatalogPage';
import BookPage from './pages/BookPage';
import RentalHistoryPage from './pages/RentalHistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminSignInPage from './pages/AdminSignInPage';
import AdminRentalPage from './pages/AdminPage';
import { checkTokenExpiration } from './features/api/authSlice';

// Image source:
// www.freepik.com/free-vector/thesis-concept-illustration_20824350.htm#fromView=search&page=1&position=3&uuid=bda7643a-99f4-4910-b399-16f305f95e62

function App() {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <Container maxWidth="false" sx={{ padding: '0 !important' }}>
      {!location.pathname.startsWith('/sign') && (
        <>
          <Navbar />
          <Toolbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={token == null ? <SignInPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={token == null ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="/profile/:userEmail" element={<ProfilePage />} />
        <Route path="/rentals/:userEmail" element={<RentalHistoryPage />} />
        {/* Admin pages */}
        <Route path="/signinadmin" element={token == null ? <AdminSignInPage /> : <Navigate to="/" />} />
        <Route path="/adminrentals" element={token != null ? <AdminRentalPage /> : <Navigate to="/signinadmin" />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
      {!location.pathname.startsWith('/sign') && <Footer />}
    </Container>
  );
}

export default App;
