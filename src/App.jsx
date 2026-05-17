import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ViewportProvider } from './context/ViewportContext'
import Login from './components/page-components/Login'
import AdminDashboard from './components/page-components/AdminDashboard'
import AdminHome from './components/page-components/admin/AdminHome'
import Users from './components/page-components/admin/Users'
import Footer from './components/page-components/Footer'
import UserDashboard from './components/page-components/admin/UserDashboard'
import AdminProjects from './components/page-components/admin/Projects'
import AdminBlogs from './components/page-components/admin/Blogs'
import AdminContactInfo from './components/page-components/admin/ContactInfo'
import AdminClientInfo from './components/page-components/admin/ClientInfo'
import AdminBillingInvoice from './components/page-components/admin/BillingInvoice'
import AdminCompanyInfo from './components/page-components/admin/CompanyInfo'

/** Already logged in → skip login screen. */
function GuestOnly({ children }) {
  if (localStorage.getItem('authToken')) {
    return <Navigate to="/admin" replace />
  }
  return children
}

/** Protect admin routes (JWT must exist for axios Bearer + backend requireAuth). */
function RequireAuth() {
  if (!localStorage.getItem('authToken')) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}

function LoginPage() {
  return (
    <GuestOnly>
      <main>
        <Login />
      </main>
      <Footer />
    </GuestOnly>
  )
}

function App() {
  return (
    <ViewportProvider>
      <ToastContainer position="top-right" autoClose={4000} closeOnClick pauseOnHover theme="light" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="usersetup" element={<UserSetupPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="clientinfo" element={<AdminClientInfoPage />} />
            <Route path="billinginvoice" element={<AdminBillingInvoicePage />} />
            <Route path="companyinfo" element={<AdminCompanyInfoPage />} />
            <Route path="contact" element={<AdminContactPage />} />
          </Route>
        </Route>
      </Routes>
    </ViewportProvider>
  )
}

function UsersPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Users</h2>
      <Users />
    </div>
  )
}

function UserSetupPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">User Dashboard</h2>
      <UserDashboard />
    </div>
  )
}

function AdminProjectsPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Projects</h2>
      <AdminProjects />
    </div>
  )
}

function AdminBlogsPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Blogs</h2>
      <AdminBlogs />
    </div>
  )
}

function AdminContactPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Contact</h2>
      <AdminContactInfo />
    </div>
  )
}

function AdminClientInfoPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Client Info</h2>
      <AdminClientInfo />
    </div>
  )
}

function AdminBillingInvoicePage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Billing Invoice</h2>
      <AdminBillingInvoice />
    </div>
  )
}

function AdminCompanyInfoPage() {
  return (
    <div className="admin-content">
      <h2 className="admin-content-title">Company Info</h2>
      <AdminCompanyInfo />
    </div>
  )
}

export default App
