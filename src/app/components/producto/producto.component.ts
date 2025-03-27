import { Component } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [CommonModule,RouterModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  Productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.GetProductoTabla().subscribe(
      (data: any) => {
        this.Productos = data;
      }
    );
  }
}
