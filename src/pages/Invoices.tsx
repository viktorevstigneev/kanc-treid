import React, { useEffect, useState } from "react";
import { getAllInvoices, addInvoice } from "../services/database";
import DataTable from "../components/DataTable";

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    number: "",
    productName: "",
    unit: "",
    quantity: "",
    price: "",
    total: "",
  });

  const loadInvoices = () => {
    setLoading(true);
    const data = getAllInvoices();
    setInvoices(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleSubmit = () => {
    addInvoice({
      number: formData.number,
      productName: formData.productName,
      unit: formData.unit,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      total: parseFloat(formData.total),
    });

    setShowForm(false);
    setFormData({
      number: "",
      productName: "",
      unit: "",
      quantity: "",
      price: "",
      total: "",
    });
    loadInvoices();
  };

  const columns = [
    "number",
    "productName",
    "unit",
    "quantity",
    "price",
    "total",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Накладные</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Создать накладную
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Новая накладная</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Номер накладной"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Товар"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
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
              type="number"
              placeholder="Количество"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
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
              type="number"
              placeholder="Сумма"
              value={formData.total}
              onChange={(e) =>
                setFormData({ ...formData, total: e.target.value })
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
              onClick={() => setShowForm(false)}
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
        <DataTable columns={columns} data={invoices} />
      )}
    </div>
  );
};

export default Invoices;
