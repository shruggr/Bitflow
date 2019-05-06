import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WalletComponent } from './wallet/wallet.component';
import { environment } from 'src/environments/environment';
import { WorkflowsComponent } from './workflows/workflows.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { CreateComponent } from './workflows/create/create.component';
import { ManageComponent } from './workflows/manage/manage.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WorkflowsComponent,
    ScriptsComponent,
    CreateComponent,
    ManageComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModalModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateComponent]
})
export class AppModule { }
