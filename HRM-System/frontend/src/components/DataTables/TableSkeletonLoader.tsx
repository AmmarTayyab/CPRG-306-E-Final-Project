import React from "react";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";

// Define a generic type for TableSkeletonLoader
interface TableSkeletonLoaderProps<TData> {
  columns: ColumnDef<TData, any>[];
}

const TableSkeletonLoader = <TData,>({
  columns,
}: TableSkeletonLoaderProps<TData>) => {
  return (
    <div className="rounded-md border mb-8">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b bg-gray-200">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                >
                  <div className="hover:cursor-pointer">
                    {typeof column.header === "function"
                      ? column.header({} as HeaderContext<TData, any>)
                      : column.header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {Array.from({ length: 20 }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {columns.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-1 align-middle [&:has([role=checkbox])]:pr-0"
                  >
                    <div className="h-2 bg-gray-300 rounded animate-pulse w-3/4 my-1"></div>
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

export default TableSkeletonLoader;
