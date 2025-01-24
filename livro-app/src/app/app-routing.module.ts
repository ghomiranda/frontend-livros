import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './livros/listar/listar.component';
import { FormComponent } from './livros/form/form.component';
import { ListarComponent as ListarAutores } from './autores/listar/listar.component';
import { FormComponent as FormAutores } from './autores/form/form.component';
import { ListarComponent as ListarAssuntos } from './assuntos/listar/listar.component';
import { FormComponent as FormAssuntos } from './assuntos/form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'livros', component: ListarComponent },
  { path: 'livros/novo', component: FormComponent },
  { path: 'livros/editar/:id', component: FormComponent },
  { path: 'autores', component: ListarAutores },
  { path: 'autores/novo', component: FormAutores },
  { path: 'autores/editar/:id', component: FormAutores },
  { path: 'assuntos', component: ListarAssuntos },
  { path: 'assuntos/novo', component: FormAssuntos },
  { path: 'assuntos/editar/:id', component: FormAssuntos },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
