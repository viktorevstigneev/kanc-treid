import React, { useEffect, useState } from "react";
import { getAllWarehouses, updateWarehouseStock } from "../services/database";
import DataTable from "../components/DataTable";

const Warehouses: React.FC = () => {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStock, setEditingStock] = useState<{
    id: string;
    productName: string;
    quantity: number;
  } | null>(null);

  const loadWarehouses = () => {
    setLoading(true);
    const data = getAllWarehouses();
    setWarehouses(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  const handleUpdateStock = () => {
    if (editingStock) {
      updateWarehouseStock(
        editingStock.id,
        editingStock.productName,
        editingStock.quantity,
      );
      setEditingStock(null);
      loadWarehouses();
    }
  };

  const columns = ["id", "address", "productName", "quantity", "price"];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Склады и остатки
      </h2>

      {editingStock && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Изменить количество</h3>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">
                Склад: {editingStock.id}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Товар: {editingStock.productName}
              </p>
              <input
                type="number"
                value={editingStock.quantity}
                onChange={(e) =>
                  setEditingStock({
                    ...editingStock,
                    quantity: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdateStock}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Сохранить
            </button>
            <button
              onClick={() => setEditingStock(null)}
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
          data={warehouses}
          onEdit={(row) =>
            setEditingStock({
              id: row.id,
              productName: row.productName,
              quantity: row.quantity,
            })
          }
        />
      )}
    </div>
  );
};

export default Warehouses;
