import UserList from "../../interfaces/userList";
import {ActionReducerMap} from "@ngrx/store";
import {usersListNode, usersReducer} from "./users";
import {UsersActions} from "../actions/users";


export interface State {
  [usersListNode]: UserList
}

export const reducer: ActionReducerMap<State, UsersActions> = {
  [usersListNode]: usersReducer
}


