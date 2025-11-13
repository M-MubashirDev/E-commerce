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

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const category = useSelector((state) => state.categories.selectedCategory);
  const categories = useSelector((state) => state.categories.categories);

  //......fecthing products
  useEffect(() => {
    dispatch(fetchProducts({ limit: 50 }));
  }, [dispatch]);

  console.log(
    ".............",
    category,
    categories,
    products,
    ".......products"
  );

  //..........showing content accoring to current categories
  let content;
  if (category === "All") {
    content = categories.rows.map((cat) => {
      const catProducts = products.filter((p) => p.categoryId === cat.id);

      return (
        <ItemSlider
          key={cat.id}
          items={catProducts}
          title={cat.title}
          catId={cat.id}
        />
      );
    });
  } else {
    const filteredProducts = products
      .filter((p) => p.categoryId === category.id)
      ?.slice(0, 12);

    content = (
      <div className="content-spacing ">
        <HeaderButton
          title={`Best in ${category.id}`}
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

  return (
    <div>
      <SmallHero />
      <CategoryBar />

      {loading && <div className="text-center text-white py-4">Loading...</div>}
      {error && <div className="text-center text-red-400 py-4">{error}</div>}

      <div className="bg-light-gray py-12">{!loading && !error && content}</div>
    </div>
  );
}

export default Home;
