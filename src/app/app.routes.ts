import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { QuestionarioComponent } from './questionario/questionario.component';
import { GrupoComponent } from './grupo/grupo.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  {path: 'questionario', component: QuestionarioComponent},
  {path: 'questionario/:usuariokey', component: QuestionarioComponent},
  {path: 'grupo', component: GrupoComponent},
  {path: 'grupo/:usuariokey/:questionariokey', component: GrupoComponent},
  /* será redirecionado para a URL /aluno quando a URL terminar na raiz / */
  {path: '', redirectTo: '/usuario', pathMatch: 'full' },
  /* será redirecionado para a URL /matricula quando a URL for desconhecida, por exemplo, /teste */
  {path: '**', redirectTo: '/usuario' }
];