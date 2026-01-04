"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationDemo({
  totalPages,
  activePage,
  handlePage,
}: {
  totalPages: number;
  activePage: number;
  handlePage: (page: number) => void;
}) {
  return (
    <Pagination className="py-2">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={activePage <= 1}
            variant={"ghost"}
            onClick={() => handlePage(activePage - 1)}
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>
        {[...new Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page == activePage;
          return (
            <PaginationItem>
              <Button
                variant={isActive ? "outline" : "ghost"}
                onClick={() => handlePage(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            disabled={activePage == totalPages}
            variant={"ghost"}
            onClick={() => handlePage(activePage + 1)}
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
