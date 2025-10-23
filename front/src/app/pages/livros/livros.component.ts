import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LivrosServices } from '../../services/livros.services';
import { Livro } from '../../model/livro';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['/livros.component.css'],
  template: `
    <section style="margin:2rem 0;padding:0 1rem">
      <h1>Livros</h1>

      <a routerLink="/">Voltar ao início</a>

      @if (carregando()) {
        <p>Carregando…</p>
      } @else if (erro()) {
        <p style="color:#c62828">{{ erro() }}</p>
      } @else {
        <ul style="padding-left:1.25rem">
          @for (a of livros(); track a.id) {
            <li style="margin:.25rem 0">
              <strong>{{ a.titulo }} {{ a.subtitulo }}</strong>
              @if (a.autor) { — <em style="color:#666">{{ a.autor }}</em> }
              @if (a.editora) { • {{ a.editora }} }
              @if (a.isbn) { <div style="color:#555">{{ a.isbn }}</div> }
              @if (a.descricao) { <div style="color:#555">{{ a.descricao }}</div> }
              @if (a.idioma) { • {{ a.idioma }} }
              @if (a.ano) { • {{ a.ano }} }
              @if (a.paginas) { • {{ a.paginas }} }
              @if (a.preco) { • {{ a.preco }} }
              @if (a.estoque) { • {{ a.estoque }} 
              @if (a.desconto) { • {{ a.desconto }} }
              @if (a.disponivel) { • {{ a.disponivel }} }
              @if (a.dimensoes) { • {{ a.dimensoes }} }}
              @if (a.peso) { • {{ a.peso }} }
            </li>
          }
        </ul>
      }
    </section>
  `
})
export class LivrosComponent {
  private svc = inject(LivrosServices);
  private auth = inject(AuthService);   //Ver o token
  livros = signal<Livro[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  constructor() {
    console.log("Token de acesso: ", this.auth.token());
    
    this.svc.listar().subscribe({
      next: (data) => { this.livros.set(data); this.carregando.set(false); },
      error: () => { this.erro.set('Falha ao carregar livros'); this.carregando.set(false); }
    });
  }
}