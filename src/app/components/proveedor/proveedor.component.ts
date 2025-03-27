import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-proveedor',
  standalone:true,
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export class ProveedorComponent {
  Proveedor: any[] = [];

  constructor(private ProveedorService:ProveedorService){

  }

  ngOnInit(): void {
      this.ProveedorService.GetProveedor().subscribe(
        (data:any) =>{
        this.Proveedor = data;
      })
  }
}
