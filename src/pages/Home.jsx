import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsThunks";
import ItemSlider from "../components/ItemsSlider";
import CategoryBar from "../components/CatergorySlider";
import { useDispatch, useSelector } from "react-redux";
import SmallHero from "../components/SmallHero";
import ProductCard from "../components/ProductCard";
import HeaderButton from "../ui/HeaderButton";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products);
  const category = useSelector((state) => state.categories.selectedCategory);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Take the first 4 categories
  const topCategories = [
    ...new Set(categories.slice(0, 4)?.map((c) => c.name)),
  ];

  let content;

  if (category === "All") {
    // Show 4 category sliders
    content = topCategories.map((catName) => {
      const catProducts = products.filter((p) => p.category?.name === catName);

      return <ItemSlider key={catName} items={catProducts} title={catName} />;
    });
  } else {
    // Show only selected category slider
    const filteredProducts = products
      .filter((p) => p.category?.name === category)
      ?.slice(0, 12);

    content = (
      <div className="content-spacing ">
        <HeaderButton
          title={`Best in ${filteredProducts[0]?.category.name}`}
          handleFunction={() =>
            navigate(`/products?category=${filteredProducts[0]?.category.name}`)
          }
        />
        <div className="grid max-h-[70vh] h-[70vh]  overflow-y-auto mt-6  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:grid-cols-4   lg:grid-cols-3 md:grid-cols-2  gap-4 gap-y-6  justify-items-center mx-auto w-full">
          {filteredProducts?.map((product) => (
            <div key={product.id} className="w-fit">
              <ProductCard item={product} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SmallHero />
      <CategoryBar />

      {loading && <div className="text-center text-white py-4">Loading...</div>}
      {error && <div className="text-center text-red-400 py-4">{error}</div>}

      <div className="bg-light-gray  py-12">
        {!loading && !error && content}
      </div>
    </div>
  );
}

export default Home;
