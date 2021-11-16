import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainComponent} from "./components/main/main.component";
import {RouterModule, Routes} from "@angular/router";
import {UserItemComponent} from './components/user-item/user-item.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from '@ngrx/store';
import {reducer} from "./redux/reducers";
import { EffectsModule } from '@ngrx/effects';
import {UserEffects} from "./redux/effects/user";

const routes: Routes = [
  {path: '', component: MainComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserItemComponent,
    UserFormComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot(reducer, {}),
    EffectsModule.forRoot([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
