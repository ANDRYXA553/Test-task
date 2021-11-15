import {createFeatureSelector, createSelector} from "@ngrx/store";
import UserList from "../../interfaces/userList";
import {usersListNode} from "../reducers/users";
import User from "../../interfaces/user";


export const selectUsersFeature = createFeatureSelector<UserList>(usersListNode);


export const selectUsers = createSelector(selectUsersFeature,
  (state: UserList): User[] => state.users
);
