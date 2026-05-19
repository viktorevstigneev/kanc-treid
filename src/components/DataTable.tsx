import React from "react";

interface DataTableProps {
  columns: string[];
  data: Record<string, any>[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
        Нет данных
      </div>
    );
  }

  return (
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
            {(onEdit || onDelete) && (
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">
                Действия
              </th>
            )}
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
              {(onEdit || onDelete) && (
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                      >
                        Изменить
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
