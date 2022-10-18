import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MessageComponent } from './message/message.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { HomeComponent } from './home/home.component';
import { RegisteredComponent } from './registered/registered.component';

const routes: Routes = [
  {
    path:'login', component: LoginComponent
  },
  {
    path:'registration', component: RegistrationComponent
  },
  {
    path:'message', component: MessageComponent
  },
  {
    path:'inbox', component: InboxComponent
  },
  {
    path:'sent', component: SentComponent
  },
  {
    path:'registered', component: RegisteredComponent
  },
  {
    path:'', component: HomeComponent
  },
  {
    path:'home', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
