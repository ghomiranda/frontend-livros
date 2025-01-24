import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  assuntos: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAll('assuntos').subscribe(
      (data) => {
        this.assuntos = data;
      },
      (error) => {
        console.error('Erro ao buscar assuntos:', error);
      }
    );
  }

  deletarAssunto(id: number): void {
    if (confirm('Deseja realmente deletar este assunto?')) {
      this.apiService.delete('assuntos', id).subscribe({
        next: () => {
          this.assuntos = this.assuntos.filter((assunto) => assunto.codas !== id);
          alert('Assunto deletado com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao deletar assunto:', error);
        }
      });
    }
  }

}
