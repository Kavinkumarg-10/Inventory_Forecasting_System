import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Inventory from "./admin/Inventory";
import CustomerLayout from "./customer/CustomerLayout";
import ViewProducts from "./customer/ViewProducts";
import MyPurchases from "./customer/MyPurchases";
import Forecasting from "./admin/Forecasting";
import PurchaseOrders from "./admin/PurchaseOrders";
import PurchaseOrderDetails from "./admin/PurchaseOrderDetails";
import Landing from "./public/Landing";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ADMIN AREA */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="purchase-orders/:id" element={<PurchaseOrderDetails />} />

        </Route>

        <Route
            path="/customer"
            element={
              <ProtectedRoute role="CUSTOMER">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<ViewProducts />} />
            <Route path="purchases" element={<MyPurchases />} />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
