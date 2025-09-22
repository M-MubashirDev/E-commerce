import { useSelector } from "react-redux";
import ItemSlider from "./ItemsSlider";
import SectionHeading from "../ui/Headings";
function ProductRecent() {
  const { products, loading, error } = useSelector((state) => state.products);
  return (
    <div className="bg-dark section-spacing">
      <SectionHeading
        title="Recent Boughts"
        subtitle="See what shoppers are loving right now."
      />
      <ItemSlider
        items={products.filter((p) => p.category?.name === "Electronics")}
        title="Best in Electronics"
      />
    </div>
  );
}

export default ProductRecent;
