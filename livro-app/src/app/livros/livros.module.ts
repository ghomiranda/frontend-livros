import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule 
  ]
})
export class LivrosModule { }
