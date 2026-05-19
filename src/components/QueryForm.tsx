import React, { ReactNode } from "react";

interface QueryFormProps {
  title: string;
  children: ReactNode;
  onExecute: () => void;
  isLoading?: boolean;
}

const QueryForm: React.FC<QueryFormProps> = ({
  title,
  children,
  onExecute,
  isLoading = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="flex gap-4 mb-6 flex-wrap">{children}</div>

      {isLoading && (
        <div className="text-yellow-600 mb-4">Processing query...</div>
      )}
    </div>
  );
};

export default QueryForm;
