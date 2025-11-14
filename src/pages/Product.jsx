import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../features/products/productsThunks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProductDetail from "../components/SingleProductDetail";
import SingleProductCarousel from "../components/SingleProductCarousel";
import { Spinner } from "../ui/Spinners";
import ErrorMessage from "../ui/ErrorMessage";

function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const { productImages, price, title, description, categoryId, discount } =
    selectedProduct || {};

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  console.log(loading, error);
  return (
    <section
      style={{
        backgroundImage: "url('/bg-Summery_2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-light-gray py-8 lg:py-12"
    >
      {loading && !selectedProduct && <Spinner />}
      {error && !loading && !selectedProduct && <ErrorMessage error={error} />}
      {selectedProduct && (
        <div className="flex flex-col lg:flex-row gap-8 content-spacing">
          <SingleProductCarousel productImages={productImages} />
          <SingleProductDetail
            id={id}
            price={price}
            title={title}
            discount={discount}
            categoryId={categoryId}
            description={description}
            selectedProduct={selectedProduct}
            productImages={productImages}
          />
        </div>
      )}
    </section>
  );
}

export default Product;
