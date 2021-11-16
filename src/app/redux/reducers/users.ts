import UserList from "../../interfaces/userList";
import {UsersActions, usersActionType} from "../actions/users";

export const usersListNode = 'usersList';

const initialState: UserList = localStorage.getItem('usersList') ? JSON.parse(localStorage.getItem('usersList') as string) : {
  users: []
}

export const usersReducer = (state = initialState, action: UsersActions) => {

  switch (action.type) {

    case usersActionType.create: {
      return {...state, users: [action.payload, ...state.users]}
    }

    case usersActionType.delete: {
      const listAfterRemove = state.users.filter((user) => user.id !== action.payload)
      return {...state, users: [...listAfterRemove]}
    }
    case usersActionType.update: {
      const listAfterUpdate = state.users.map((user) => {

        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      })
      return {...state, users: [...listAfterUpdate]}
    }

    case usersActionType.saveToLs: {
      localStorage.setItem('usersList', JSON.stringify(state));
      return {...state}
    }

    default : {
      return state;
    }
  }
}



