import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContentPage from './pages/ContentPage';
import CategoryPage from './pages/CategoryPage';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ContentSummaryPage from './pages/ContentSummaryPage';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={
            <PrivateRoute element={ <HomePage /> } allowedRoles={['admin', 'creator', 'reader']} />
          } />
          <Route path="/content/:categoryId" element={
            <PrivateRoute element={ <ContentSummaryPage /> } allowedRoles={['admin', 'creator', 'reader']} />
          } /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/content/:categoryId" element={<ContentSummaryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/content" element={
            <PrivateRoute element={ <ContentPage /> } allowedRoles={['admin', 'creator']} />
          } />
          <Route path="/categories" element={
            <PrivateRoute element={<CategoryPage />} allowedRoles={['admin']} />
          } />
          <Route path="/profile" element={
            <PrivateRoute element={<ProfilePage />} allowedRoles={['admin', 'creator', 'reader']} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
