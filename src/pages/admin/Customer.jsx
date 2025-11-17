import { Title } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import CustomerTable from "../../components/CustomerTable";
import { getAllUsers } from "../../features/auth/authThunks";
import { customerInitialState, cutomerReducer } from "../../utilities/Reducers";

export default function Customers() {
  const dispatch = useDispatch();
  const {
    usersList = [],
    totalUsers = 0,
    loading,
  } = useSelector((state) => state.auth);
  const [state, dispatchReducer] = useReducer(
    cutomerReducer,
    customerInitialState
  );
  const { page, limit } = state;

  const totalPages = Math.ceil(totalUsers / limit);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <div>
      <Title order={2} mb="lg" align="center">
        Customers
      </Title>

      <CustomerTable
        users={usersList}
        loading={loading}
        totalPages={totalPages}
        currentPage={state.page}
        onPageChange={(page) =>
          dispatchReducer({ type: "page", payload: page })
        }
      />
    </div>
  );
}
