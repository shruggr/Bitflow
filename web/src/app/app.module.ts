import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
import { SchemasComponent } from './schemas/schemas.component';
import { WalletComponent } from './wallet/wallet.component';
import { environment } from 'src/environments/environment';
import { WorkflowsComponent } from './workflows/workflows.component';
import { ScriptsComponent } from './scripts/scripts.component';

@NgModule({
  declarations: [
    AppComponent,
    SchemasComponent,
    WalletComponent,
    WorkflowsComponent,
    ScriptsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
