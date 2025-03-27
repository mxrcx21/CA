import { RouterModule, Routes } from '@angular/router';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductoComponent } from './components/producto/producto.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AddProductoComponent } from './components/add-producto/add-producto.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'principal', component:PrincipalComponent},
    {path:'navbar', component:NavbarComponent},
    {path:'proveedor', component:ProveedorComponent},
    {path:'categoria', component:CategoriaComponent},
    {path:'usuario', component:UsuarioComponent},
    {path:'producto', component:ProductoComponent},
    {path:'add-producto', component:AddProductoComponent},
    { path: '', redirectTo: '', pathMatch: 'full' }, 
    {path:'**', redirectTo:''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
