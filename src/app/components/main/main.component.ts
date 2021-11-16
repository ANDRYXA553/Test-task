import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserFormComponent} from "../user-form/user-form.component";
import {select, Store} from "@ngrx/store";
import User from "../../interfaces/user";
import {selectUsers} from "../../redux/selectors/users";
import {Observable} from "rxjs";
import {MessagesService} from "../../sevices/messages.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  users$: Observable<User[]> = this.store.pipe(select(selectUsers));
  showMessage$: Observable<Boolean> = this.messageService.currentMessage.pipe(select('successMessage'));

  constructor(private ngbModal: NgbModal,
              private store: Store,
              private messageService: MessagesService) {

  }

  ngOnInit(): void {
  }

  openModal() {
    this.ngbModal.open(UserFormComponent, {centered: true, size: 'lg'});
  }

}
