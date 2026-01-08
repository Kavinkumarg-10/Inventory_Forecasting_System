import { useEffect, useState } from "react";
import API from "../services/api";
import AddProductModal from "./AddProductModal";
import TableSkeleton from "./TableSkeleton";
import EditProductModal from "./EditProductModal";

export default function Inventory() {
  const [products, setProducts] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  

  const loadProducts = async () => {
  setTimeout(async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  }, 1000);
};

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  await API.delete(`/products/${id}`);
  loadProducts(); // reload table
};


  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <button className="primary-btn" onClick={() => setShowAddModal(true)}>
                + Add Product
              </button>
      </div>
    <div className="table-wrapper page-enter">
      <table className="inventory-table">
<thead>
    <tr>
    <th>Product Name</th>
    <th>Category</th>
    <th>Unit Price</th>
    <th>Available</th>
    <th>Reorder Point</th>
    <th>Reorder Quantity</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody>
      {products === null ? (
        <tr>
          <td colSpan="7">
            <TableSkeleton rows={10} />
          </td>
        </tr>
      ) : products.length === 0 ? (
        <tr>
          <td colSpan="7" style={{ textAlign: "center" }}>
            No products found
          </td>
        </tr>
      ) : (
        products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>₹ {p.unitPrice}</td>
            <td>{p.onHand}</td>
            <td>{p.reorderPoint}</td>
            <td>{p.reorderQuantity}</td>
            <td>
              <span
                  style={{ cursor: "pointer", marginRight: "12px" }}
                  onClick={() => setEditProduct(p)}
                >
                  ✏️
                </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(p.id)}
                title="Delete"
              >
                🗑️
              </span>
            </td>
          </tr>
        ))
      )}
    </tbody>

      </table>
    </div>
            {showAddModal && (
                <AddProductModal
                  close={() => setShowAddModal(false)}
                  refresh={loadProducts}
                />
              )}

              {editProduct && (
                <EditProductModal
                  product={editProduct}
                  close={() => setEditProduct(null)}
                  refresh={loadProducts}
                />
              )}
    </>
  );
}
