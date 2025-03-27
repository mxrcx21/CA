import { Component } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  Usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.GetUsuario().subscribe(
      (data: any) => {
        this.Usuarios = data;
      }
    );
  }
}
