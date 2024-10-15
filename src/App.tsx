import { useEffect } from "react";
import UserList from "./components/UsersList";
import SortPanel from "./components/SortPanel";
import ApiService from "./api/apiService";
import { useAppDispatch } from "./hooks/store";
import { setUsers } from "./store/Users";
import UsersProfile from "./components/UsersProfile";

function App() {
  const dispatch = useAppDispatch();

	useEffect(() => {
		ApiService.getUsers().then((result) => {
      dispatch(setUsers(result));
    });
	}, [dispatch])

  return (
    <div className="App">
      <SortPanel />
      <UserList />
      <UsersProfile />
    </div>
  );
}

export default App;
