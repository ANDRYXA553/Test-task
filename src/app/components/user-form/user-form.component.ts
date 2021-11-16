import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../interfaces/user";
import {select, Store} from "@ngrx/store";
import {UserCreateAction, UserDeleteAction, UserUpdateAction} from "../../redux/actions/users";
import {selectUsers} from "../../redux/selectors/users";
import {Subscription} from "rxjs";
import {MessagesService} from "../../sevices/messages.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass', '../main/main.component.sass']
})


export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user: User;
  isFormSubmited = false;
  selectedRole: null | string = null
  isSelectOpened = false;
  storeSub: Subscription;

  createForm: FormGroup

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store,
    private messagesService: MessagesService
  ) {
    this.createFormFunc();

  }

  ngOnInit(): void {
    this.setUserFromState();
  }

  selectRole(isAdmin: boolean) {

    isAdmin ? this.selectedRole = 'Admin' : this.selectedRole = 'Driver';

    this.isSelectOpened = false;

    this.createForm.patchValue({
      ...this.createForm.value, user_type: this.selectedRole
    });
  }

  setUserFromState() {

    if (this.user) {
      this.createForm.patchValue({
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        user_type: this.user.user_type,
        password: this.user.password,
        repeat_password: this.user.password
      });

      this.selectedRole = this.user ? this.user.user_type : null;
    }
  }

  createFormFunc() {

    this.createForm = this.fb.group({
        userName: ['', Validators.compose([Validators.required])],
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        user_type: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])],
        repeat_password: [''],
      }, {validators: [this.checkEqual('password', 'repeat_password'), this.checkUniqueUserName()]},
    );
  }

  closeModal(): void {
    this.activeModal.close();
  }

  submitForm(): void {
    this.isFormSubmited = true;

    if (this.createForm.valid) {
      let user = this.createForm.value as User;
      user.id = Date.now();
      this.store.dispatch(new UserCreateAction(user));
      this.closeModal();
      this.messagesService.setMessage({
        errorMessage: false,
        successMessage: true,
        textOfMessage: 'User create successful.'
      });
    }
  }

  checkEqual(password: string, confirmPass: string) {
    return (group: FormGroup) => {

      let passwordInput = group.controls[password], passwordConfirmationInput = group.controls[confirmPass];

      if (!(passwordConfirmationInput.value)) {
        return passwordConfirmationInput.setErrors({required: true});
      }

      if (passwordInput.value !== passwordConfirmationInput.value && passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});

      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }

  }

  checkUniqueUserName() {
    return (group: FormGroup) => {
      let control = group.controls.userName;

      this.storeSub = this.store.pipe(select(selectUsers)).subscribe((value => {

          if (value.find(user => user.userName === control?.value && !this.user)) {
            return control.setErrors({userNameNotUniq: true});

          } else {
            return control.setErrors(null);
          }

        }
      ))

    }
  }


  checkValidity(control: string, errorType = '') {


    for (const controlKey in this.createForm.controls) {

      if (control === controlKey && errorType === 'require') {
        return (this.createForm.controls[control].errors?.required && this.isFormSubmited);
      }

      if (control === controlKey && errorType === 'email') {
        return (this.createForm.controls[control].errors?.email && this.isFormSubmited);
      }

      if (control === controlKey && errorType === 'pattern') {
        return (this.createForm.controls[control].errors?.pattern && this.isFormSubmited);
      }

      if (control === controlKey && errorType === 'password-equal') {
        return this.createForm.controls.repeat_password.errors?.notEquivalent && this.isFormSubmited;
      }

      if (control === controlKey && errorType === 'uniq') {
        return this.createForm.controls.userName.errors?.userNameNotUniq && this.isFormSubmited;
      }

      if (control === controlKey) {
        return (this.createForm.controls[control].errors && this.isFormSubmited);
      }
    }
  }

  deleteUser() {
    if (this.user) {
      this.store.dispatch(new UserDeleteAction(this.user.id));
      this.activeModal.close();
      this.messagesService.setMessage({
        errorMessage: false,
        successMessage: true,
        textOfMessage: 'User delete successful'
      });
    }
  }

  updateUser() {
    this.isFormSubmited = true

    if (this.createForm.valid) {
      let user = {...this.user, ...this.createForm.value};
      delete user['repeat_password'];

      this.store.dispatch(new UserUpdateAction(user as User));
      this.activeModal.close();
      this.messagesService.setMessage({
        errorMessage: false,
        successMessage: true,
        textOfMessage: 'User update successful'
      });

    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
