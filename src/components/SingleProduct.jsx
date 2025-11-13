import { useNavigate } from "react-router-dom";
import HeaderButton from "../ui/HeaderButton";
import ProductCard from "./ProductCard";

function SingleProduct({ category, products }) {
  const navigate = useNavigate();
  const filteredProducts = products
    .filter((p) => p.categoryId === category.id)
    ?.slice(0, 12);
  return (
    <div className="content-spacing ">
      <HeaderButton
        title={`Best in ${category.title}`}
        handleFunction={() => navigate(`/products?category=${category.id}`)}
      />
      <div className="grid max-h-[70vh] h-[70vh] overflow-x-hidden overflow-y-auto mt-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 gap-y-6 justify-items-center mx-auto w-full">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="w-fit">
            <ProductCard item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleProduct;
