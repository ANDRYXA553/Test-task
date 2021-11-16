import {Action} from "@ngrx/store";
import User from "../../interfaces/user";

export enum usersActionType {
  update = 'UPDATE USER',
  delete = 'DELETE USER',
  create = 'CREATE USER',
  saveToLs = 'SAVE TO LS',

}

export class UserCreateAction implements Action {

  readonly type = usersActionType.create;

  constructor(public payload: User) {
  }

}

export class UserDeleteAction implements Action {

  readonly type = usersActionType.delete;

  constructor(public payload: number) {
  }

}

export class UserUpdateAction implements Action {

  readonly type = usersActionType.update;

  constructor(public payload: User) {
  }

}

export class UsersSaveToLsAction implements Action {

  readonly type = usersActionType.saveToLs;


}

export type UsersActions = UserCreateAction | UserDeleteAction | UserUpdateAction | UsersSaveToLsAction;
