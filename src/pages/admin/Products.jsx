import { Card, Drawer, Pagination, Title } from "@mantine/core";
import { useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsThunks";
import AdminProductsAction from "../../components/AdminProductAction";
import AdminProductsFilters from "../../components/AdminProductsFilters";
import ProductAdminTable from "../../components/ProductAdminTable";
import {
  AdminProductInitialStates,
  adminProductReducer,
} from "../../utilities/Reducers";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const [state, dispatchReducer] = useReducer(
    adminProductReducer,
    AdminProductInitialStates
  );
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    items: products,
    total,
    loading,
    maxPrice,
  } = useSelector((state) => state.products);

  const totalPages = Math.max(1, Math.ceil(total / state.limit));

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDrawerOpened(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setDrawerOpened(true);
  };

  const handleSearchChange = (value) => {
    dispatchReducer({ type: "setField", field: "title", value });
    dispatchReducer({ type: "setPage", payload: 0 });
  };

  const handleCategoryChange = (val) => {
    dispatchReducer({
      type: "setField",
      field: "categoryId",
      value: val === "All" ? null : Number(val),
    });
    dispatchReducer({ type: "setPage", payload: 0 });
  };

  // const handlePriceChange = (val) => {
  //   dispatchReducer({
  //     type: "setField",
  //     field: "price",
  //     value: { lowerLimit: val[0], upperLimit: val[1] },
  //   });
  //   dispatchReducer({ type: "setPage", payload: 0 });
  // };

  const handleSortChange = (val) => {
    dispatchReducer({ type: "setField", field: "sortBy", value: val });
  };

  useEffect(() => {
    dispatch(fetchProducts(state));
  }, [dispatch, state]);

  useEffect(() => {
    dispatchReducer({
      type: "setField",
      field: "price",
      value: { lowerLimit: 0, upperLimit: maxPrice },
    });
  }, [maxPrice]);

  return (
    <>
      <Title order={2} mb="lg" align="center">
        Products
      </Title>
      <Card shadow="sm" radius="lg" p="0" withBorder>
        <AdminProductsFilters
          handleCategoryChange={handleCategoryChange}
          state={state}
          handleSearchChange={handleSearchChange}
          handleAdd={handleAdd}
          // maxPrice={maxPrice}
          // handlePriceChange={handlePriceChange}
          handleSortChange={handleSortChange}
        />
        <ProductAdminTable
          loading={loading}
          products={products}
          handleEdit={handleEdit}
        />
        {/* Pagination */}
        {!loading && (
          <div className="py-3 flex justify-center border-t border-gray-200">
            <Pagination
              total={totalPages}
              value={state.page + 1}
              onChange={(page) =>
                dispatchReducer({ type: "setPage", payload: page - 1 })
              }
              color="dark"
            />
          </div>
        )}
      </Card>

      {/* Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        position="right"
        size="lg"
        overlayProps={{ opacity: 0.4, blur: 3 }}
      >
        <AdminProductsAction
          existingProduct={selectedProduct}
          onClose={() => setDrawerOpened(false)}
        />
      </Drawer>
    </>
  );
}
