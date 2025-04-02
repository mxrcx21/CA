import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.scss'
})
export class AddUsuarioComponent {

  usuarioForm: FormGroup;
  showsuccess = false;
  showError = false;
  estado: any[] = [];
  roles: any[] = [];
  generos: any[] = [];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private categoriaService: CategoriaService) {
    this.usuarioForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      apellido: ['', [Validators.required,Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.pattern('^\\d{9}$')]],
      rol_id: ['', Validators.required],
      genero: ['', Validators.required],
      estado_id: ['', Validators.required]
    });
  }
  

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      this.usuarioService.CrearUsuario(usuario).subscribe(
        response => {
          console.log(response);
          this.showsuccess = true;
          this.usuarioForm.reset();
          setTimeout(() => this.showsuccess = false, 3000);
        },
        error => {
          console.log("Error al agregar el usuario", error);
          this.showError = true;
          setTimeout(() => this.showError = false, 3000);
        }
      );
    } else {
      console.log("Formulario invalido");
    }
  }

   ngOnInit(): void {
    this.cargarEstado();
    this.cargarRol();
    this.cargarGenero();
  }
  cargarEstado(): void {
    this.categoriaService.getParametro('Estado de Usuario').subscribe({
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

  cargarRol(): void {
    this.categoriaService.getParametro('Roles').subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar los roles:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }

  cargarGenero(): void {
    this.categoriaService.getParametro('Genero').subscribe({
      next: (data) => {
        this.generos = data;
      },
      error: (err) => {
        console.error('Error al cargar los generos:', err);
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }
}
