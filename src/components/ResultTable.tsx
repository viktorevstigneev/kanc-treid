import React from "react";

interface ResultTableProps {
  columns: string[];
  data: Record<string, any>[];
  title?: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ columns, data, title }) => {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="mt-4">
      {title && (
        <h4 className="font-semibold mb-3 text-lg text-gray-700">{title}</h4>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="border border-gray-300 px-4 py-2 text-gray-600"
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
