import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

function ProductPagination({ currentPage, totalPages, setCurrentPage }) {
  const [pageNum, setPageNum] = useState([1, 2, 3]);

  useEffect(() => {
    // If we're at the very beginning
    if (currentPage <= 1) {
      setPageNum([1, 2, 3].filter((p) => p <= totalPages));
    }
    // If we're near the end
    else if (currentPage >= totalPages - 1) {
      setPageNum(
        [totalPages - 2, totalPages - 1, totalPages].filter(
          (p) => p >= 1 && p <= totalPages
        )
      );
    }
    // Otherwise, keep currentPage centered
    else {
      setPageNum([currentPage - 1, currentPage, currentPage + 1]);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center py-6 my-6 gap-2">
      {/* Prev Button */}
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        variant="filled"
        color="dark"
        radius="md"
        className="!text-white"
      >
        Prev
      </Button>

      {/* Page Numbers */}
      {pageNum.map((value) => (
        <Button
          key={value}
          variant={currentPage === value ? "filled" : "outline"}
          color={currentPage === value ? "dark" : "gray"}
          onClick={() => setCurrentPage(value)} // FIXED
          radius="md"
          className="sm:flex !hidden"
        >
          {value}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        variant="filled"
        color="dark"
        radius="md"
      >
        Next
      </Button>
    </div>
  );
}

export default ProductPagination;
