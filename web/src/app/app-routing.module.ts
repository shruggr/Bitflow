import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemasComponent } from './schemas/schemas.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { WorkflowsComponent } from './workflows/workflows.component';

const routes: Routes = [
  {path: 'schemas', component: SchemasComponent},
  {path: 'scripts', component: ScriptsComponent},
  {path: 'workflows', component: WorkflowsComponent},
  {path: '', component: WorkflowsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
