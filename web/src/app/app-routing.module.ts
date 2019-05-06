import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScriptsComponent } from './scripts/scripts.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { ManageComponent } from './workflows/manage/manage.component';

const routes: Routes = [
  {path: 'scripts', component: ScriptsComponent},
  {path: 'workflows', component: WorkflowsComponent},
  {path: 'workflows/manage', component: ManageComponent},
  {path: '', component: WorkflowsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
