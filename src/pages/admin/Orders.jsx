import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mantine/core";
import { fetchOrders } from "../../features/orders/orderThunks";
import OrdersTable from "../../components/OrderTable";

const initialState = {
  page: 0,
  limit: 10,
  address: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "address":
      return { ...state, address: action.payload };
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, total, loading } = useSelector((state) => state.orders);
  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const { page, limit, address } = state;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchOrders({ page, limit, address }));
  }, [dispatch, page, limit, address]);

  return (
    <div>
      <Title order={2} mb="lg" align="center">
        Orders
      </Title>

      <OrdersTable
        orders={orders}
        loading={loading}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(page) =>
          dispatchReducer({ type: "page", payload: page })
        }
        onSearch={(term) => dispatchReducer({ type: "address", payload: term })}
      />
    </div>
  );
}
