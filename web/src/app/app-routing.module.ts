import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemasComponent } from './schemas/schemas.component';

const routes: Routes = [
  {path: 'schemas', component: SchemasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
