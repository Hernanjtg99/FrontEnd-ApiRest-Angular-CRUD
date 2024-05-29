import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pelicula } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private http = inject(HttpClient);

  lista()
  {
    return this.http.get<Pelicula[]>("http://localhost:8080/api/peliculas")
  }

  create(pelicula: Pelicula)
  {
    return this.http.post<Pelicula>("http://localhost:8080/api/peliculas",pelicula)
  }

  get(id: number)
  {
    return this.http.get<Pelicula>(`http://localhost:8080/api/peliculas/${id}`)
  }

  update(id: number,pelicula: Pelicula)
  {
    return this.http.put<Pelicula>(`http://localhost:8080/api/peliculas/${id}`,pelicula)
  }

  delete(id: number)
  {
     return this.http.delete(`http://localhost:8080/api/peliculas/${id}`)
  }
}
