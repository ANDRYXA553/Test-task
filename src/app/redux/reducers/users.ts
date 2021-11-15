import UserList from "../../interfaces/userList";
import {UsersActions, usersActionType} from "../actions/users";

const mockUser = {
  id: 111,
  userName: 'vasya',
  firstName: 'bebrich',
  lastName: 'stepan',
  email: 'zalupkin228@gnail.com',
  user_type: 'Administrator',
  password: 'string2222'
}

export const usersListNode = 'usersList';

const initialState: UserList = {
  users: [mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser, mockUser]
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

    default : {
      return state;
    }
  }
}
