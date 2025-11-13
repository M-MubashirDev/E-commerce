import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CategoryBar from "../components/CatergorySlider";
import SmallHero from "../components/SmallHero";
import HomeAllContent from "../components/HomeAllContent";
import SingleProduct from "../components/SingleProduct";
import ErrorMessage from "../ui/ErrorMessage";

import { Spinner } from "../ui/Spinners";
import { fetchProducts } from "../features/products/productsThunks";

function Home() {
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const category = useSelector((state) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 50 }));
  }, [dispatch]);
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <div>
      <SmallHero />
      <CategoryBar />

      <div className="bg-light-gray py-12">
        {category === "All" ? (
          <HomeAllContent products={products} />
        ) : (
          <SingleProduct category={category} products={products} />
        )}
      </div>
    </div>
  );
}

export default Home;
