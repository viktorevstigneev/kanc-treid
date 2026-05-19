import React, { useEffect, useState } from "react";
import { getAllSuppliers, addSupplier } from "../services/database";
import DataTable from "../components/DataTable";

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    legalAddress: "",
    accountNumber: "",
    productName: "",
    productPrice: "",
  });

  const loadSuppliers = () => {
    setLoading(true);
    const data = getAllSuppliers();
    setSuppliers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleSubmit = () => {
    addSupplier({
      id: formData.id,
      name: formData.name,
      legalAddress: formData.legalAddress,
      accountNumber: formData.accountNumber,
      productName: formData.productName,
      productPrice: parseFloat(formData.productPrice),
    });

    setShowForm(false);
    setFormData({
      id: "",
      name: "",
      legalAddress: "",
      accountNumber: "",
      productName: "",
      productPrice: "",
    });
    loadSuppliers();
  };

  const columns = [
    "id",
    "name",
    "legalAddress",
    "accountNumber",
    "productName",
    "productPrice",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Поставщики</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Добавить поставщика
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Новый поставщик</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="ID поставщика"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
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
              placeholder="Юр. адрес"
              value={formData.legalAddress}
              onChange={(e) =>
                setFormData({ ...formData, legalAddress: e.target.value })
              }
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Номер счета"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
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
              type="number"
              placeholder="Цена поставки"
              value={formData.productPrice}
              onChange={(e) =>
                setFormData({ ...formData, productPrice: e.target.value })
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
        <DataTable columns={columns} data={suppliers} />
      )}
    </div>
  );
};

export default Suppliers;
