"use client";

import * as UI from "@/components/ui/table";
import { GenericHeader } from "./GenericHeader";
import { GenericBody } from "./GenericBody";
import { Pagination } from "./Pagination";

export type TableColumn<T> = {
  key: string;
  label: string;
  render?: (value: T, index?: number) => React.ReactNode;
  classHeader?: string;
  classCell?: string;
};

export type Pagination = {
  totalPages: number;
  page: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  onFirstPage?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onLastPage?: () => void;
  className?: string;
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  pagination?: Pagination;
  emptyMessage?: string;
};

export function GenericTable<T>({
  columns,
  data,
  pagination,
  emptyMessage = "Nenhum dado encontrado",
}: TableProps<T>) {
  return (
    <div className=" overflow-hidden w-full">
      <div className="overflow-x-auto">
        <UI.Table className="bg-white border rounded-lg">
          <GenericHeader columns={columns} />
          <GenericBody
            columns={columns}
            data={data}
            emptyMessage={emptyMessage}
          />
        </UI.Table>
        {pagination && <Pagination {...pagination} className="py-2" />}
      </div>
    </div>
  );
}
