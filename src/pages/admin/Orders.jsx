import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mantine/core";
import { fetchOrders } from "../../features/orders/orderThunks";
import OrdersTable from "../../components/OrderTable";
import { orderInitialState, orderReducer } from "../../utilities/Reducers";

export default function Orders() {
  const dispatch = useDispatch();
  const [state, dispatchReducer] = useReducer(orderReducer, orderInitialState);
  const { orders, total, loading } = useSelector((state) => state.orders);

  console.log(orders);
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
