import { Component } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  Categoria: any[] = [];
  estado: any[] = [];
  categoriaByID: any = {
    id_categoria: 0,
    nombre: '',
    descripcion: '',
    estado: ''
  };
  categoriaForm: FormGroup;
  showsuccess = false;
  showError = false;
  constructor(private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
      id_categoria: [''],
      nombre: ['', Validators.required],
      descripcion: ['',Validators.required],
      estado: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategoria();
    this.cargarEstado(); 
  }
  getCategoria() {
    this.categoriaService.GetCategoria().subscribe((data: any) => {
      this.Categoria = data;
    });
  }
  cargarEstado(): void {
    this.categoriaService.getParametro('Estado de Categoría').subscribe({
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

    onSubmit() {
      if (this.categoriaForm.valid) {
        const categoria = this.categoriaForm.value;
  
        this.categoriaService.editarCategoria(categoria).subscribe(
          (response) => {
            console.log(response);
            this.showsuccess = true;
            this.getCategoria();
          },
          (error) => {
            console.log('Error al actualizar la categoria', error);
            this.showError = true;
          }
        );
      } else {
        console.log('Formulario Invalido');
      }
    }
  
  
  getCategoriaByID(id: number): void {
    this.categoriaService.getCategoriaByID(id).subscribe((data: any) => {
      this.categoriaByID = data;
    });
  }
  eliminarCategoria(id:number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
    this.categoriaService.eliminarCategoria(id).subscribe(
      (response) => {
        console.log(response);
        this.getCategoria();
      },
      (error) => {
        console.error('Error al eliminar la categoria:', error);
      }
    );
  }
  }
}
