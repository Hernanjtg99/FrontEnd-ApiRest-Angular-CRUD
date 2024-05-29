import { Component, inject } from '@angular/core';
import { PeliculaService } from '../pelicula.service';
import { Pelicula } from '../pelicula';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  private peliculaservice = inject(PeliculaService)

  peliculas: Pelicula[]

  listaCompleta()
  {
     this.peliculaservice.lista().subscribe(
      peliculas => this.peliculas = peliculas
    )
  }
  

  ngOnInit(): void {
    this.listaCompleta();
  }

  delete(pelicula:Pelicula)
  {
    this.peliculaservice.delete(pelicula.id).subscribe();
    location.reload();
  }
}
