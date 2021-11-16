import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map} from "rxjs/operators";
import {usersActionType, UsersSaveToLsAction} from "../actions/users";


@Injectable()
export class UserEffects {

  saveToLs$ = createEffect(() => this.actions$.pipe(
    ofType(usersActionType.delete, usersActionType.create, usersActionType.update),
    map(() => new UsersSaveToLsAction())
  ))

  constructor(private actions$: Actions,
  ) {
  }
}
