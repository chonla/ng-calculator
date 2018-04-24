import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CalculatorService } from './services/calculator.service';
import { OperatorPipe } from './pipes/operator.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    OperatorPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
