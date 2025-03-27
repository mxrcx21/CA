import { Component } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categoria',
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  Categoria: any[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.GetCategoria().subscribe(
      (data: any) => {
        this.Categoria = data;
      }
    );
  }
}
