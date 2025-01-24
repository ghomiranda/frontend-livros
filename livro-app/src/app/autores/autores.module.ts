import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ListarComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AutoresModule { }
