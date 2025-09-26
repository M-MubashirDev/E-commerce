import ProductCard from "../components/ProductCard";

function ProductGrid({ paginatedProducts, showFilters }) {
  return (
    <div className="h-[70vh]   overflow-y-auto  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div
        className={`grid  gap-8 justify-items-center w-full sm:justify-items-start  ${
          showFilters
            ? "xl:grid-cols-3 grid-cols-1 lg:grid-cols-2"
            : "xl:grid-cols-4 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {paginatedProducts.map((product) => (
          <div key={product.id} className="w-fit ">
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
