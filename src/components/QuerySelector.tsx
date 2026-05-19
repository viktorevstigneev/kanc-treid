import React from "react";

interface QuerySelectorProps {
  activeQuery: number;
  onSelect: (queryId: number) => void;
}

const QuerySelector: React.FC<QuerySelectorProps> = ({
  activeQuery,
  onSelect,
}) => {
  const queries = [
    { id: 13, title: "Query 13: Employees hired on specific date" },
    { id: 16, title: "Query 16: Products by invoice number and total" },
    { id: 19, title: "Query 19: Bank by account owner" },
    { id: 33, title: "Query 33: Warehouses by product and manufacturer" },
    { id: 37, title: "Query 37: Suppliers with credit above amount" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Select Query
      </h2>
      <div className="flex gap-4 flex-wrap">
        {queries.map((query) => (
          <button
            key={query.id}
            onClick={() => onSelect(query.id)}
            className={`px-6 py-2 rounded-lg font-medium transition duration-200 ${
              activeQuery === query.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {query.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuerySelector;
