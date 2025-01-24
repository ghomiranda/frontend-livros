import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  livros: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAll('livros').subscribe((data) => {
      this.livros = data;
    });
  }

  deletarLivro(id: number): void {
    if (confirm('Deseja realmente deletar este livro?')) {
      this.apiService.delete('livros', id).subscribe({
        next: () => {
          this.livros = this.livros.filter((livro) => livro.codli !== id);
        },
        error: (error) => {
          console.error('Erro ao deletar livro:', error);
        },
        complete: () => {
          console.log('Requisição de exclusão finalizada.');
        }
      });
    }
  }

  downloadRelatorio(): void {
    this.apiService.downloadPDF('relatorios/livros').subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'relatorio_livros.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
