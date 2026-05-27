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
  const [results, setResults] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Query 13
  const [hireDate, setHireDate] = useState("");

  // Query 16
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  // Query 19
  const [ownerName, setOwnerName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Query 33
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  // Query 37
  const [creditAmount, setCreditAmount] = useState("");

  const handleQuery13 = async () => {
    if (!hireDate) {
      setError("Введите дату");
      return;
    }
    setError("");
    try {
      const data = query13(hireDate);
      console.log("Query13 data:", data);
      setResults(data);
      setColumns(["fullName", "position", "hireDate"]);
    } catch (err) {
      setError("Ошибка: " + err);
      setResults([]);
    }
  };

  const handleQuery16 = async () => {
    if (!invoiceNumber || !totalAmount) {
      setError("Введите номер накладной и сумму");
      return;
    }
    setError("");
    try {
      const data = query16(invoiceNumber, parseFloat(totalAmount));
      console.log("Query16 data:", data);
      setResults(data);
      setColumns(["number", "productName", "quantity", "total"]);
    } catch (err) {
      setError("Ошибка: " + err);
      setResults([]);
    }
  };

  const handleQuery19 = async () => {
    if (!ownerName || !accountNumber) {
      setError("Введите владельца и номер счета");
      return;
    }
    setError("");
    try {
      const data = query19(ownerName, accountNumber);
      console.log("Query19 data:", data);
      setResults(data);
      setColumns(["bankName", "number", "ownerName"]);
    } catch (err) {
      setError("Ошибка: " + err);
      setResults([]);
    }
  };

  const handleQuery33 = async () => {
    if (!productName || !manufacturer) {
      setError("Введите товар и изготовителя");
      return;
    }
    setError("");
    try {
      const data = query33(productName, manufacturer);
      console.log("Query33 data:", data);
      setResults(data);
      setColumns(["id", "address", "productName", "quantity"]);
    } catch (err) {
      setError("Ошибка: " + err);
      setResults([]);
    }
  };

  const handleQuery37 = async () => {
    if (!creditAmount) {
      setError("Введите сумму кредита");
      return;
    }
    setError("");
    try {
      const data = query37(parseFloat(creditAmount));
      console.log("Query37 data:", data);
      setResults(data);
      setColumns(["id", "name", "creditAmount"]);
    } catch (err) {
      setError("Ошибка: " + err);
      setResults([]);
    }
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
              setResults([]);
              setError("");
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeQuery === q.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
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
              placeholder="YYYY-MM-DD"
            />
            <button
              onClick={handleQuery13}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Выполнить
            </button>
          </div>
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
        </div>
      )}

      {/* ОТОБРАЖЕНИЕ РЕЗУЛЬТАТОВ - ВСЕГДА ВНИЗУ */}
      {results.length > 0 && (
        <div className="mt-6">
          <ResultTable columns={columns} data={results} title="Результаты:" />
        </div>
      )}

      {results.length === 0 && (
        <div className="mt-6 text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
          Нет данных. Выполните запрос.
        </div>
      )}
    </div>
  );
};

export default Queries;
