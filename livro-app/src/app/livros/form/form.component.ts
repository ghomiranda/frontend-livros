import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  livroForm!: FormGroup;
  autores: any[] = [];
  assuntos: any[] = [];
  isEditMode = false;
 

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.livroForm = this.fb.group({
      codli: [null],
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: [null, [Validators.required, Validators.min(1)]],
      anoPublicacao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      valor: [null, [Validators.required, Validators.min(0)]],
      autores: [[], Validators.required],
      assuntos: [[], Validators.required]
    });
    
    this.carregarAutores();
    this.carregarAssuntos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getById('livros', +id).subscribe((livro) => {
        livro.valor = livro.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const autoresSelecionados = livro.autores.map((autor: any) => autor.codau);
        const assuntosSelecionados = livro.assuntos.map((assunto: any) => assunto.codas);

        this.livroForm.patchValue({
          ...livro,
          autores: autoresSelecionados,
          assuntos: assuntosSelecionados
        });
      });
    }
  }

  carregarAutores(): void {
    this.apiService.getAll('autores').subscribe((autores) => {
      this.autores = autores;
    });
  }

  carregarAssuntos(): void {
    this.apiService.getAll('assuntos').subscribe((assuntos) => {
      this.assuntos = assuntos;
    });
  }

  salvar(): void {
    if (this.livroForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  

    const livroFormValue = this.livroForm.value;
  

    const livro = {
      ...livroFormValue,
      valor: parseFloat(livroFormValue.valor.replace(',', '.')),
      autores: livroFormValue.autores.map((codau: number) => ({
        codau,
        nome: null,
        livros: null,
      })),
      assuntos: livroFormValue.assuntos.map((codas: number) => ({
        codas,
        descricao: null,
        livros: null,
      })),
    };
  
  
    if (this.isEditMode) {
      this.apiService.update('livros', livro.codli, livro).subscribe({
        next: () => {
          alert('Livro atualizado com sucesso!');
          this.router.navigate(['/livros']);
        },
        error: (err) => {
          console.error('Erro ao atualizar o livro:', err);
        },
      });
    } else {
      this.apiService.create('livros', livro).subscribe({
        next: () => {
          alert('Livro criado com sucesso!');
          this.router.navigate(['/livros']);
        },
        error: (err) => {
          console.error('Erro ao criar o livro:', err);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/livros']);
  }

  formatarValor(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // Remove caracteres não numéricos, exceto vírgulas
    valor = valor.replace(/[^0-9,]/g, '');

    // Substitui múltiplas vírgulas ou pontos por uma vírgula
    valor = valor.replace(/,+/g, ',');

    // Atualiza o valor no campo de texto
    input.value = valor;

    this.livroForm.get('valor')?.setValue(valor);
  }

}
