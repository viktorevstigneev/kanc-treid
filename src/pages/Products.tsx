import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/database";
import DataTable from "../components/DataTable";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    grade: "",
    price: "",
    manufacturer: "",
    manufacturerAddress: "",
  });

  const loadProducts = () => {
    setLoading(true);
    const data = getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        unit: formData.unit,
        grade: formData.grade,
        price: parseFloat(formData.price),
        manufacturer: formData.manufacturer,
        manufacturerAddress: formData.manufacturerAddress,
      });
    } else {
      addProduct({
        name: formData.name,
        unit: formData.unit,
        grade: formData.grade,
        price: parseFloat(formData.price),
        manufacturer: formData.manufacturer,
        manufacturerAddress: formData.manufacturerAddress,
      });
    }

    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      unit: "",
      grade: "",
      price: "",
      manufacturer: "",
      manufacturerAddress: "",
    });
    loadProducts();
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      unit: product.unit,
      grade: product.grade,
      price: product.price.toString(),
      manufacturer: product.manufacturer,
      manufacturerAddress: product.manufacturerAddress,
    });
    setShowForm(true);
  };

  const handleDelete = (product: any) => {
    if (window.confirm(`Удалить товар "${product.name}"?`)) {
      deleteProduct(product.id);
      loadProducts();
    }
  };

  const columns = [
    "id",
    "name",
    "unit",
    "grade",
    "price",
    "manufacturer",
    "manufacturerAddress",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Товары</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setFormData({
              name: "",
              unit: "",
              grade: "",
              price: "",
              manufacturer: "",
              manufacturerAddress: "",
            });
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Добавить товар
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingProduct ? "Редактировать" : "Новый"} товар
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Наименование"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Ед. измерения"
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Сорт"
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Цена"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Изготовитель"
              value={formData.manufacturer}
              onChange={(e) =>
                setFormData({ ...formData, manufacturer: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Адрес изготовителя"
              value={formData.manufacturerAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  manufacturerAddress: e.target.value,
                })
              }
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Сохранить
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Загрузка...</div>
      ) : (
        <DataTable
          columns={columns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Products;
