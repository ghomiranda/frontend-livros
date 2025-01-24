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
  assuntoForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.assuntoForm = this.fb.group({
      codas: [null],
      descricao: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.apiService.getById('assuntos', +id).subscribe((assunto) => {
        this.assuntoForm.patchValue(assunto);
      });
    }
  }

  salvar(): void {
    if (this.assuntoForm.invalid) {
      return;
    }

    const assunto = this.assuntoForm.value;

    if (this.isEditMode) {
      this.apiService.update('assuntos', assunto.codas, assunto).subscribe(() => {
        alert('Assunto atualizado com sucesso!');
        this.router.navigate(['/assuntos']);
      });
    } else {
      this.apiService.create('assuntos', assunto).subscribe(() => {
        alert('Assunto criado com sucesso!');
        this.router.navigate(['/assuntos']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/assuntos']);
  }

}
