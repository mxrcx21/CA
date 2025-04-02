import { Component } from '@angular/core';
import { ProveedorService } from '../../service/proveedor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-proveedor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-proveedor.component.html',
  styleUrl: './add-proveedor.component.scss'
})
export class AddProveedorComponent {
  proveedorForm: FormGroup;
  showsuccess = false;
  showError = false;
  estado: any[] = [];

  constructor(private proveedorService: ProveedorService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      nombre_compania: ['', Validators.required],
      contacto: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado_id: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.proveedorForm.valid) {
      const proveedor = this.proveedorForm.value;

      this.proveedorService.agregarProveedor(proveedor).subscribe(
        response => {
          console.log(response);
          this.showsuccess = true;
          this.proveedorForm.reset();
          setTimeout(() => this.showsuccess = false, 3000);
        },
        error => {
          console.log("Error al agregar el proveedor", error);
          this.showError = true;
          setTimeout(() => this.showError = false, 3000);
        }
      );
    } else {
      console.log("Formulario inválido");
    }
  }
  ngOnInit(): void {
    this.cargarEstado();
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
}
