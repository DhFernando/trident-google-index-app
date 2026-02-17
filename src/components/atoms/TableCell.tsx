import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className = '' }) => {
  return <td className={`text-sm ${className}`}>{children}</td>;
};
