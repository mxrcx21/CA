import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-proveedor',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export class ProveedorComponent {
  Proveedor: any[] = [];
  estado: any[] = [];
  proveedorByID: any = {
    id_proveedor: 0,
    nombre: '',
    nombre_compania: '',
    contacto: '',
    correo: '',
    estado: ''
  };
  proveedorForm: FormGroup;
  showsuccess = false;
  showError = false;

  constructor(private proveedorService: ProveedorService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder
  ) {
    this.proveedorForm = this.fb.group({
      id_proveedor: [''],
      nombre: ['', Validators.required],
      nombre_compania: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     this.getProveedor();
      this.cargarEstado();
  }
  onSubmit() {
    if (this.proveedorForm.valid) {
      const proveedor = this.proveedorForm.value;

      this.proveedorService.editarProveedor(proveedor).subscribe(
        response => {
          console.log(response);
          this.showsuccess = true;
          setTimeout(() => this.showsuccess = false, 3000);
          this.getProveedor();
        },
        error => {
          console.log("Error al actualizar el proveedor", error);
          this.showError = true;
          setTimeout(() => this.showError = false, 3000);
        }
      );
    } else {
      console.log("Formulario inválido");
    }
  }
  cargarEstado(): void {
    this.categoriaService.getParametro('Estado de Proveedor').subscribe({
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
  getProveedor() {
    this.proveedorService.GetProveedor().subscribe((data: any) => {
      this.Proveedor = data;
    });
  }

  getProveedorByID(id: number): void {
    this.proveedorService.getProveedorByID(id).subscribe((data: any) => {
      this.proveedorByID = data;
    });
  }

  eliminarCategoria(id:number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
    this.proveedorService.eliminarProveedor(id).subscribe(
      (response) => {
        console.log(response);
        this.getProveedor();
        this.showsuccess = true;
        this.showsuccess = response.message;
        setTimeout(() => this.showsuccess = false, 3000);
      },
      (error) => {
        console.error('Error al eliminar el Proveedor', error);
      }
    );
  }
  }
}
