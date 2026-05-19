import React, { useState } from "react";
import {
  query13,
  query16,
  query19,
  query33,
  query37,
} from "../services/database";
import ResultTable from "../components/ResultTable";

const Queries: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState(13);

  // Query 13
  const [hireDate, setHireDate] = useState("");
  const [employees, setEmployees] = useState([]);

  // Query 16
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [invoices, setInvoices] = useState([]);

  // Query 19
  const [ownerName, setOwnerName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);

  // Query 33
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [warehouses, setWarehouses] = useState([]);

  // Query 37
  const [creditAmount, setCreditAmount] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  const [error, setError] = useState("");

  const handleQuery13 = () => {
    if (!hireDate) {
      setError("Введите дату");
      return;
    }
    setError("");
    const results: any = query13(hireDate);
    setEmployees(results);
  };

  const handleQuery16 = () => {
    if (!invoiceNumber || !totalAmount) {
      setError("Введите номер накладной и сумму");
      return;
    }
    setError("");
    const results: any = query16(invoiceNumber, parseFloat(totalAmount));
    setInvoices(results);
  };

  const handleQuery19 = () => {
    if (!ownerName || !accountNumber) {
      setError("Введите владельца и номер счета");
      return;
    }
    setError("");
    const results: any = query19(ownerName, accountNumber);
    setBankAccounts(results);
  };

  const handleQuery33 = () => {
    if (!productName || !manufacturer) {
      setError("Введите товар и изготовителя");
      return;
    }
    setError("");
    const results: any = query33(productName, manufacturer);
    setWarehouses(results);
  };

  const handleQuery37 = () => {
    if (!creditAmount) {
      setError("Введите сумму кредита");
      return;
    }
    setError("");
    const results: any = query37(parseFloat(creditAmount));
    setSuppliers(results);
  };

  const queries = [
    { id: 13, title: "13. Сотрудники, принятые в определенную дату" },
    { id: 16, title: "16. Товары по накладной и сумме" },
    { id: 19, title: "19. Банк по владельцу счета" },
    { id: 33, title: "33. Склады с товаром изготовителя" },
    { id: 37, title: "37. Поставщики с кредитом выше суммы" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Аналитические запросы
      </h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        {queries.map((q) => (
          <button
            key={q.id}
            onClick={() => {
              setActiveQuery(q.id);
              setError("");
            }}
            className={`px-4 py-2 rounded-lg font-medium ${activeQuery === q.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {q.title}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Query 13 */}
      {activeQuery === 13 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleQuery13}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
          {employees.length > 0 && (
            <ResultTable
              columns={["fullName", "position", "hireDate"]}
              data={employees}
              title="Результаты:"
            />
          )}
          {employees.length === 0 && hireDate && (
            <p className="text-gray-500">Сотрудники не найдены</p>
          )}
        </div>
      )}

      {/* Query 16 */}
      {activeQuery === 16 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Номер накладной"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Сумма"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleQuery16}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
          {invoices.length > 0 && (
            <ResultTable
              columns={["number", "productName", "quantity", "total"]}
              data={invoices}
              title="Результаты:"
            />
          )}
        </div>
      )}

      {/* Query 19 */}
      {activeQuery === 19 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Владелец счета"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Номер счета"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleQuery19}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
          {bankAccounts.length > 0 && (
            <ResultTable
              columns={["bankName", "number", "ownerName"]}
              data={bankAccounts}
              title="Результаты:"
            />
          )}
        </div>
      )}

      {/* Query 33 */}
      {activeQuery === 33 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Товар"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Изготовитель"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleQuery33}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
          {warehouses.length > 0 && (
            <ResultTable
              columns={["id", "address", "productName", "quantity"]}
              data={warehouses}
              title="Результаты:"
            />
          )}
        </div>
      )}

      {/* Query 37 */}
      {activeQuery === 37 && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              placeholder="Минимальная сумма кредита"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={handleQuery37}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
          {suppliers.length > 0 && (
            <ResultTable
              columns={["id", "name", "creditAmount"]}
              data={suppliers}
              title="Результаты:"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Queries;
