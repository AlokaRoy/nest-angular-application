import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'authorization', component: AuthComponent },
  { path: 'products', component: ProductComponent, canActivate: [authGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
