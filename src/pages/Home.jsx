import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";
import ItemSlider from "../components/ItemsSlider";
import CategoryBar from "../components/CatergorySlider";
// import ProductRecent from "../components/ProductRecent";
import { useDispatch, useSelector } from "react-redux";
import SmallHero from "../components/SmallHero";

function Home() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const category = useSelector((state) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category?.name === category);

  return (
    <div>
      <SmallHero />
      <CategoryBar />

      {loading && <div className="text-center text-white py-4">Loading...</div>}

      {error && <div className="text-center text-red-400 py-4">{error}</div>}
      <div className="content-spacing bg-light-gray">
        {!loading && !error && (
          <>
            {category === "All" ? (
              <>
                <ItemSlider
                  items={products.filter((p) => p.category?.name === "Clothes")}
                  title="Trending in Clothes"
                />
                <ItemSlider
                  items={products.filter(
                    (p) => p.category?.name === "Electronics"
                  )}
                  title="Best in Electronics"
                />
              </>
            ) : (
              <ItemSlider
                items={filteredProducts}
                title={`Best in ${category}`}
              />
            )}
          </>
        )}
      </div>
      {/* <ProductRecent /> */}
    </div>
  );
}

export default Home;
