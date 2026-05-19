import React from "react";

interface HeaderProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { id: "products", name: "📦 Товары" },
    { id: "warehouses", name: "🏭 Склады" },
    { id: "suppliers", name: "🚚 Поставщики" },
    { id: "invoices", name: "📄 Накладные" },
    { id: "queries", name: "🔍 Запросы" },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">
            КанцТрейд - Управление продажами
          </h1>
        </div>
        <nav className="flex gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activePage === item.id
                  ? "bg-blue-700 border-b-2 border-white"
                  : "hover:bg-blue-500"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
