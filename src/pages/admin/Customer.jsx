import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mantine/core";
import { getAllUsers } from "../../features/auth/authThunks";
import CustomerTable from "../../components/CustomerTable";

const initialState = {
  page: 0,
  limit: 20,
};

function reducer(state, action) {
  switch (action.type) {
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export default function Customers() {
  const dispatch = useDispatch();
  const {
    usersList = [],
    totalUsers = 0,
    loading,
  } = useSelector((state) => state.auth);
  const [state, dispatchReducer] = useReducer(reducer, initialState);
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
