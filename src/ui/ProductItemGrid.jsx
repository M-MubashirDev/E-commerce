import ProductCard from "../components/ProductCard";

function ProductGrid({ paginatedProducts }) {
  return (
    <div className="h-[70vh] shadow-xs  overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-wrap gap-8 justify-center">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
