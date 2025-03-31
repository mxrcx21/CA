import { Component } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  Productos: any[] = [];
  productoByID: any ={
    id_producto: 0,
    nombre: '',
    descripcion: '',
    precio_compra: 0,
    precio_venta: 0,
    stock_min: 0,
    estado_id: 0,
    categoria_id: 0,
    proveedor_id: 0
  };
  productoForm: FormGroup;
  showsuccess = false;
  showError = false;
  categorias: any[] = [];
  proveedores: any[] = [];
  estado: any[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      id_producto: [''],
      nombre: ['', Validators.required],
      descripcion: [''],
      precio_compra: ['', [Validators.required, Validators.min(0)]],
      precio_venta: ['', [Validators.required, Validators.min(0)]],
      stock_min: ['', Validators.required],
      estado: ['', Validators.required],
      categoria: ['', Validators.required],
      proveedor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProducto();
    this.cargarCategorias();
    this.cargarProveedores();
    this.cargarEstado();
  }

  getProducto(): void 
  {
    this.productoService.GetProductoTabla().subscribe(
      (data: any) => {
        this.Productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  getProductoByID(id: number): void {
    this.productoService.getProductoByID(id).subscribe(
      (data: any) => {
        this.productoByID = data;
      },
      (error) => {
        console.error('Error al obtener producto:', error);
      }
    );
  }
  onSubmit() {
    if (this.productoForm.valid) {
      const producto = this.productoForm.value;

      this.productoService.EditarProducto(producto).subscribe(
        (response) => {
          console.log(response);
          this.showsuccess = true;
          this.getProducto();
        },
        (error) => {
          console.log('Error al actualizar el producto', error);
          this.showError = true;
        }
      );
    } else {
      console.log('Formulario Invalido');
    }
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
  eliminarProducto(id:number): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
    this.productoService.EliminarProducto(id).subscribe(
      (response) => {
        console.log(response);
        this.getProducto();
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
  }
}
