import { useSelector } from "react-redux";
import ItemSlider from "../components/ItemsSlider";

function HomeAllContent({ products }) {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <>
      {categories.rows.map((cat) => {
        const catProducts = products
          .filter((p) => p.categoryId === cat.id)
          .slice(0, 5);

        return (
          <ItemSlider
            key={cat.id}
            items={catProducts}
            title={cat.title}
            catId={cat.id}
          />
        );
      })}
    </>
  );
}

export default HomeAllContent;
