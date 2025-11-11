"use client";

import {
  Card,
  ScrollArea,
  Text,
  Image,
  Loader,
  TextInput,
  Button,
  Drawer,
  ActionIcon,
  Select,
  RangeSlider,
  Pagination,
  Title,
} from "@mantine/core";
import { useReducer, useEffect, useState } from "react";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsThunks";
import AdminProductsAction from "../../components/AdminProductAction";
import { fetchCategories } from "../../features/categories/categoriesThunks";

const initialState = {
  page: 0,
  limit: 10,
  title: "",
  categoryId: null,
  price: { lowerLimit: 0, upperLimit: 2500 },
  sortBy: "name",
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "setPage":
      return { ...state, page: action.payload };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

export default function AdminProducts() {
  const dispatch = useDispatch();
  const {
    items: products,
    total,
    loading,
    maxPrice,
  } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / state.limit));

  useEffect(() => {
    dispatch(fetchProducts(state));
  }, [dispatch, state]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatchReducer({
      type: "setField",
      field: "price",
      value: { lowerLimit: 0, upperLimit: maxPrice },
    });
  }, [maxPrice]);

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
    dispatchReducer({ type: "setPage", payload: 0 }); // Reset page
  };

  const handleCategoryChange = (val) => {
    dispatchReducer({
      type: "setField",
      field: "categoryId",
      value: val === "All" ? null : Number(val),
    });
    dispatchReducer({ type: "setPage", payload: 0 });
  };

  const handlePriceChange = (val) => {
    dispatchReducer({
      type: "setField",
      field: "price",
      value: { lowerLimit: val[0], upperLimit: val[1] },
    });
    dispatchReducer({ type: "setPage", payload: 0 });
  };

  const handleSortChange = (val) => {
    dispatchReducer({ type: "setField", field: "sortBy", value: val });
  };
  console.log(maxPrice);
  return (
    <>
      <Title order={2} mb="lg" align="center">
        Products
      </Title>
      <Card shadow="sm" radius="lg" p="0" withBorder>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4 border-b border-gray-200">
          <TextInput
            placeholder="Search product..."
            leftSection={<FiSearch size={16} />}
            value={state.title}
            onChange={(e) => handleSearchChange(e.target.value)}
            radius="md"
            className="w-full md:w-1/4"
          />

          <div className="flex w-full justify-end gap-3">
            <Select
              placeholder="Category"
              value={state.categoryId?.toString() || "All"}
              onChange={handleCategoryChange}
              data={[
                { value: "All", label: "All" },
                ...categories.rows.map((c) => ({
                  value: c.id.toString(),
                  label: c.title,
                })),
              ]}
              radius="md"
              className="w-full md:w-1/5"
            />

            <Button size="sm" onClick={handleAdd}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex m-3 items-center  justify-between">
          <RangeSlider
            value={[state.price.lowerLimit, state.price.upperLimit]}
            onChange={handlePriceChange}
            min={0}
            max={maxPrice}
            step={1}
            color="dark"
            className="w-full md:w-1/3"
          />

          <Select
            placeholder="Sort By"
            value={state.sortBy}
            onChange={handleSortChange}
            data={[
              { value: "name", label: "Name (A-Z)" },
              { value: "price-low", label: "Price Low → High" },
              { value: "price-high", label: "Price High → Low" },
            ]}
            radius="md"
            className="w-full md:w-1/5"
          />
        </div>

        {/* Table Header */}
        <div className="bg-black text-white px-4 py-2 border-b flex">
          <Text className="!text-white" style={{ flex: 1 }}>
            IMAGE
          </Text>
          <Text className="!text-white" style={{ flex: 2 }}>
            TITLE
          </Text>
          <Text className="!text-white" style={{ flex: 1 }}>
            PRICE
          </Text>
          <Text className="!text-white" style={{ flex: 1 }}>
            DISCOUNT
          </Text>
          <Text className="!text-white" style={{ flex: 1 }}>
            QUANTITY
          </Text>

          {/* <Text className="!text-white" style={{ flex: 2 }}>
            CREATED AT
          </Text> */}
          <Text
            className="!text-white"
            style={{ flex: 1, textAlign: "center" }}
          >
            ACTION
          </Text>
        </div>

        {/* Table Content */}
        <ScrollArea h={400}>
          {loading ? (
            <div className="p-4 text-center">
              <Loader size="lg" />
            </div>
          ) : (
            products.map((prod, idx) => (
              <div
                key={prod.id}
                className={`flex px-4 py-2 border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div style={{ flex: 1 }}>
                  {prod.productImages?.[0] ? (
                    <Image
                      src={prod.productImages[0].url}
                      alt={prod.title}
                      w={40}
                      h={40}
                      radius="sm"
                      fit="cover"
                    />
                  ) : null}
                </div>
                <div style={{ flex: 2 }}>{prod.title}</div>
                <div style={{ flex: 1 }}>{prod.price}</div>
                <div style={{ flex: 1 }}>{prod.discount}</div>
                <div style={{ flex: 1 }}>
                  {prod.quantity} {prod.unitQuantity}
                </div>
                {/* <div style={{ flex: 2 }}>
                  {new Date(prod.createdAt).toLocaleDateString()}
                </div> */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <ActionIcon
                    color="dark"
                    variant="light"
                    onClick={() => handleEdit(prod)}
                  >
                    <FiEdit2 size={18} />
                  </ActionIcon>
                </div>
              </div>
            ))
          )}
        </ScrollArea>

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
