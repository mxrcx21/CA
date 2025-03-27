import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { response } from 'express';
import { error, log } from 'console';
import { CategoriaService } from '../../service/categoria.service';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-add-producto',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.scss'
})
export class AddProductoComponent {
  productoForm: FormGroup;
  showsuccess = false;
  showError = false;
  categorias: any[] = []; 
  proveedores: any[] = [];
  estado: any[] = [];

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio_compra: ['', [Validators.required, Validators.min(0.5)]],
      precio_venta: ['', [Validators.required, Validators.min(0.5)]],
      stock_min: ['', [Validators.required, Validators.min(1)]],
      estado_id: ['', Validators.required],
      categoria_id: ['', Validators.required],
      proveedor_id: ['', Validators.required]
    });
  }
  onSubmit(){
    if(this.productoForm.valid){
      const producto = this.productoForm.value;

      this.productoService.CrearProducto(producto).subscribe(response => 
      {
        console.log(response);
        this.showsuccess = true;
        this.productoForm.reset();
      }, error => {
        console.log("error al agregar el producto",error);
        this.showError = true;
      }
      )
    }else{
      console.log("Formulario Invalido");
    }
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarProveedores();
    this.cargarEstado();
  }
  cargarCategorias(): void {
    this.categoriaService.GetCategoria().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }

  cargarProveedores(): void {
    this.proveedorService.GetProveedor().subscribe({
      next: (data) => {
        this.proveedores = data;
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }
  cargarEstado(): void {
    this.categoriaService.getParametro('Estado de Producto').subscribe({
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
