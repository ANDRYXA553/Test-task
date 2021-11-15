import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUserComponent} from "../create-user/create-user.component";
import {select, Store} from "@ngrx/store";
import User from "../../interfaces/user";
import {selectUsers} from "../../redux/selectors/users";
import {Observable} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  users$: Observable<User[]> = this.store.pipe(select(selectUsers));

  constructor(private ngbModal: NgbModal,
              private store: Store
  ) {
  }

  ngOnInit(): void {
  }

  openModal() {
    this.ngbModal.open(CreateUserComponent, {centered: true, size: 'lg'});
  }

}
