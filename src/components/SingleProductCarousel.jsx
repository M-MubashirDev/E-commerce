import { useState } from "react";
import { ProductDetailCarousel } from "../ui/ProductDetailCarasoul";

function SingleProductCarousel({ productImages }) {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(productImages);
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <div className="flex justify-center ">
        <ProductDetailCarousel
          images={productImages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-4 justify-center items-center h-[70px] mt-4">
        {productImages?.map((image, index) => (
          <img
            key={image.id}
            src={image?.url}
            alt={`product-thumb-${image.id}`}
            className={`h-full rounded-md w-auto object-contain cursor-pointer transition ${
              activeIndex === index
                ? "ring-1 ring-primary scale-105"
                : "opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SingleProductCarousel;
