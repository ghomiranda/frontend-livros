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
  autorForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.autorForm = this.fb.group({
      codau: [null],
      nome: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getById('autores', +id).subscribe((autor) => {
        this.autorForm.patchValue(autor);
      });
    }
  }

  salvar(): void {
    if (this.autorForm.invalid) {
      return;
    }

    const autor = this.autorForm.value;

    if (this.isEditMode) {
      this.apiService.update('autores', autor.codau, autor).subscribe(() => {
        alert('Autor atualizado com sucesso!');
        this.router.navigate(['/autores']);
      });
    } else {
      this.apiService.create('autores', autor).subscribe(() => {
        alert('Autor criado com sucesso!');
        this.router.navigate(['/autores']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/autores']);
  }

}
