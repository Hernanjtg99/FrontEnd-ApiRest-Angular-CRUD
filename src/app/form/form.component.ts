import { Component, inject } from '@angular/core';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PeliculaService } from '../pelicula.service';
import { Pelicula } from '../pelicula';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  private peliculaservice = inject(PeliculaService);
  private ruta = inject(Router);
  private formbuilder = inject(FormBuilder);
  private rutaact = inject(ActivatedRoute)

  public peliculasave: Pelicula = new Pelicula();

  formulario? :FormGroup
  pelicula?: Pelicula


  cargarPelicula()
  {
    const id =this.rutaact.snapshot.paramMap.get('id');
    if(id)
      {
       this.peliculaservice.get(parseInt(id)).subscribe(pelicula => { this.pelicula = pelicula;
        this.formulario= this.formbuilder.group(
          {
            nombre:[pelicula.nombre],
            genero:[pelicula.genero],
            idioma:[pelicula.idioma],
            estreno:[pelicula.estreno]
          }
        )   
       })
      }else{
        this.formulario= this.formbuilder.group(
          {
            nombre:[''],
            genero:[''],
            idioma:[''],
            estreno:[]
          }
        )
      }

  }


  save()
  {
    const valorformulario = this.formulario.value
    if(this.pelicula)
      {
        this.peliculasave.nombre = valorformulario.nombre;
        this.peliculasave.genero = valorformulario.genero;
        this.peliculasave.idioma = valorformulario.idioma;
        this.peliculasave.estreno = valorformulario.estreno;
         this.peliculaservice.update(this.pelicula.id, this.peliculasave).subscribe(()=>
          this.ruta.navigate(['/']))
      }else{
    this.peliculasave.nombre = valorformulario.nombre;
    this.peliculasave.genero = valorformulario.genero;
    this.peliculasave.idioma = valorformulario.idioma;
    this.peliculasave.estreno = valorformulario.estreno;

    this.peliculaservice.create(this.peliculasave).subscribe(()=>
      this.ruta.navigate(['/'])
    );
  }
  }

  ngOnInit(): void {
    this.cargarPelicula();
  }

}
