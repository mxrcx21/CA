import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.scss'
})
export class AddCategoriaComponent {
  categoriaForm: FormGroup;
  showsuccess = false;
  showError = false;
  estado: any[] = [];

  constructor(private CategoriaService: CategoriaService,
    private fb: FormBuilder)
   {
    this.categoriaForm = this.fb.group({
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      estado_id: ['',Validators.required]
    });
  }

  onSubmit(){
    if(this.categoriaForm.valid){
      const categoria = this.categoriaForm.value;

      this.CategoriaService.CrearCategoria(categoria).subscribe(response => 
      {
        console.log(response);
        this.showsuccess = true;
        this.categoriaForm.reset();
        setTimeout(() => this.showsuccess = false, 3000);
      }, error => {
        console.log("error al agregar la Categoria",error);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
      )
    }else{
      console.log("Formulario Invalido");
    }
  }
  ngOnInit(): void {
    this.cargarEstado();
  }
  cargarEstado(): void {
    this.CategoriaService.getParametro('Estado de Categoría').subscribe({
      next: (data) => {
        this.estado = data;
      },
      error: (err) => {
        console.error('Error al cargar estado:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }
}
