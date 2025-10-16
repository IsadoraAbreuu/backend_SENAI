import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Pesquisa } from '../model/pesquisas';

type LivroQuery = {
  search?: string | null;
  titulo?: string | null;
  autor?: string | null;
  id?: number | null;
  ordering?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PesquisasServices {
  private http = inject(HttpClient)
  private base = environment.apiBase

  listar(q?: LivroQuery): Observable<Pesquisa[]>{
    let params = new HttpParams()
    if (q){
      Object.entries(q).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).trim() !== ''){
          params = params.set(k, String(v))
        }
      }
    )
    }
    return this.http.get<Pesquisa[]>(this.base, {params})
  }
}
