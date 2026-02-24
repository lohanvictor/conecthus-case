import { type Pagination as PaginationType } from ".";
import * as UI from "@/components/ui/pagination";

const SIBLING_COUNT = 1;
const MINIMUM_PAGES_FOR_ELLIPSIS = 7;

export function Pagination({
  total,
  page,
  onPageChange,
  onPreviousPage,
  onNextPage,
  className,
}: PaginationType) {
  const totalPages = total;
  const currentPage = page;

  // Função para calcular quais páginas mostrar
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    // Se há poucas páginas, mostrar todas
    if (totalPages <= MINIMUM_PAGES_FOR_ELLIPSIS) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Sempre mostrar primeira página
    pages.push(1);

    // Calcular início e fim do range central
    const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 2);
    const rightSiblingIndex = Math.min(
      currentPage + SIBLING_COUNT,
      totalPages - 1
    );

    // Adicionar elipse após primeira página se necessário
    if (leftSiblingIndex > 2) {
      pages.push("ellipsis");
    }

    // Adicionar páginas do range central
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }

    // Adicionar elipse antes da última página se necessário
    if (rightSiblingIndex < totalPages - 1) {
      pages.push("ellipsis");
    }

    // Sempre mostrar última página (se não for 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (pageNumber: number) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  return (
    <UI.Pagination className={className}>
      <UI.PaginationContent>
        {onPreviousPage && (
          <UI.PaginationItem>
            <UI.PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPreviousPage();
                }
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </UI.PaginationItem>
        )}

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "ellipsis") {
            return (
              <UI.PaginationItem key={`ellipsis-${index}`}>
                <UI.PaginationEllipsis />
              </UI.PaginationItem>
            );
          }

          return (
            <UI.PaginationItem key={pageNum}>
              <UI.PaginationLink
                isActive={pageNum === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(pageNum);
                }}
              >
                {pageNum}
              </UI.PaginationLink>
            </UI.PaginationItem>
          );
        })}

        {onNextPage && (
          <UI.PaginationItem>
            <UI.PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onNextPage();
                }
              }}
              className={
                currentPage === totalPages || totalPages === 0
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </UI.PaginationItem>
        )}
      </UI.PaginationContent>
    </UI.Pagination>
  );
}
