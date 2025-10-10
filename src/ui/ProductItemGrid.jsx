import ProductCard from "../components/ProductCard";

function ProductGrid({ paginatedProducts }) {
  return (
    <div
      className={`grid mx-auto  justify-around  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4
      `}
    >
      {paginatedProducts.map((product) => (
        <div key={product.id} className="p-3   ">
          <ProductCard item={product} />
        </div>
      ))}
    </div>
  );
}
// ${
//         showFilters
//           ? "sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4"
//           : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
//       }
export default ProductGrid;
