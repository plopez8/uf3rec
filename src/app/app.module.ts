import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './projecte/components/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormexComponent } from './projecte/components/formex/formex.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
