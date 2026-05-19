import React, { useEffect, useState } from "react";
import { initDatabase } from "./data/initDb";
import Header from "./components/Header";
import Products from "./pages/Products";
import Warehouses from "./pages/Warehouses";
import Suppliers from "./pages/Suppliers";
import Invoices from "./pages/Invoices";
import Queries from "./pages/Queries";

function App() {
  const [dbReady, setDbReady] = useState(false);
  const [activePage, setActivePage] = useState("products");

  useEffect(() => {
    const setupDb = async () => {
      try {
        await initDatabase();
        setDbReady(true);
      } catch (err) {
        console.error("Failed to init database:", err);
      }
    };
    setupDb();
  }, []);

  if (!dbReady) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка базы данных...</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "products":
        return <Products />;
      case "warehouses":
        return <Warehouses />;
      case "suppliers":
        return <Suppliers />;
      case "invoices":
        return <Invoices />;
      case "queries":
        return <Queries />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activePage={activePage} onPageChange={setActivePage} />
      <div className="container mx-auto px-4 py-8">{renderPage()}</div>
    </div>
  );
}

export default App;
