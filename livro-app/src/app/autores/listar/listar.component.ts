import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  autores: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAll('autores').subscribe(
      (data) => {
        this.autores = data;
      },
      (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    );
  }

  deletarAutor(id: number): void {
    if (confirm('Deseja realmente deletar este autor?')) {
      this.apiService.delete('autores', id).subscribe({
        next: () => {
          this.autores = this.autores.filter((autor) => autor.codau !== id);
          alert('Autor deletado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar autor:', error);
        }
      });
    }
  }

}
