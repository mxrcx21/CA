import { Component } from '@angular/core';
import { InventarioService } from '../../service/inventario.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DinventarioComponent } from '../dinventario/dinventario.component';
import { DinventarioService } from '../../service/dinventario.service';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-inventario',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  inventario: any[] = [];
  dinventario: any[] = [];
  showsuccess = false;
  showError = false;
  DIform: FormGroup;
  IDMov: number= 0;
  producto: any[] = [];
  stockDisponible: number = 0;

  constructor(
    private Dinvet: DinventarioService,
    private InventarioService: InventarioService,
    private ProductoService: ProductoService,
  private fb: FormBuilder) { 
this.DIform = this.fb.group({
  MovimientoId : ['',Validators.required],
  ProductoId:['',Validators.required],
  Cantidad :['',[Validators.required, Validators.min(1),, this.stockValidator()]]
});

  }
 onSubmit(){
    if(this.DIform.valid){
      const di = this.DIform.value;

      this.Dinvet.CrearDI(di).subscribe(response => 
      {
        console.log(response);
        this.showsuccess = true;
        this.DIform.reset();
        setTimeout(() => this.showsuccess = false, 3000);
      }, error => {
        console.log("error al agregar el detalle",error);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
      )
    }else{
      console.log("Formulario Invalido");
    }
  }
  getID(id: number): void {
      this.IDMov = id;
  }

  ngOnInit(): void {
    this.getInventario();
    this.getProducto();

  }

  getInventario() {
    this.InventarioService.GetInventario().subscribe((data: any) => {
      this.inventario = data;
    });
  }

  cargarDinventario(id: number): void {
    this.Dinvet.getDinventario(id).subscribe({
      next: (data) => {
        this.dinventario = data;
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }

  getProducto(): void 
  {
    this.ProductoService.GetProductoTabla().subscribe(
      (data: any) => {
        this.producto = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  stockValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Obtener el ID del producto seleccionado
      const productoId = this.DIform?.get('ProductoId')?.value;
  
      // Buscar el producto en la lista
      const productoSeleccionado = this.producto.find(p => p.id_producto == productoId);
  
      // Si el producto no existe o aún no ha sido seleccionado, no hay error
      if (!productoSeleccionado) return null;
  
      // Obtener el stock disponible
      const stockDisponible = productoSeleccionado.stock - productoSeleccionado.stock_min;
  
      // Si la cantidad ingresada es mayor al stock disponible, retorna error
      if (control.value > stockDisponible) {
        return { stockInsuficiente: true };
      }
  
      return null; // Si todo está bien, no hay error
    };
  }
  
}
