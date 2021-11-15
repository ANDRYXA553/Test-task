import {Component, Input, OnInit} from '@angular/core';
import User from "../../interfaces/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateUserComponent} from "../create-user/create-user.component";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.sass']
})
export class UserItemComponent implements OnInit {

  @Input()
  user: User;

  constructor(private ngbModal: NgbModal) {
  }

  ngOnInit(): void {
  }

  openedUserEditModal() {
    const editComponent = this.ngbModal.open(CreateUserComponent, {centered: true, size: 'lg'});
    editComponent.componentInstance.user = this.user;
  }
}
