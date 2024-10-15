import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortBy, User, UsersState } from "../types";

const initialState: UsersState = {
	users: undefined,
	activeUserId: undefined,
	sortBy: undefined,
};

const { actions, reducer } = createSlice({
	name: 'Users',
	initialState,
	reducers: {
		setUsers(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
		},
		setactiveUserId(state, action: PayloadAction<number | undefined>) {
			state.activeUserId = action.payload;
		},
		setSortBy(state, action: PayloadAction<sortBy>) {
			state.sortBy = action.payload;
		},
	}
});

export const { setUsers, setSortBy, setactiveUserId } = actions;

export default reducer;