import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EditorasServices } from '../../services/editoras.services';
import { Editora } from '../../model/editora';
import { AuthService } from '../../services/auth.services';

@Component({
  standalone: true,
  imports: [RouterLink],
  styleUrls: ['/editoras.component.css'],
  template: `
    <section style="margin:2rem auto;padding:0 1rem">
      <h1>Editoras</h1>

      <a routerLink="/">Voltar ao início</a>

      @if (carregando()) {
        <p>Carregando…</p>
      } @else if (erro()) {
        <p style="color:#c62828">{{ erro() }}</p>
      } @else {
        <ul>
          @for (a of editoras(); track a.id) {
            <li style="margin:.25rem 0">
              <strong>{{ a.editora }} {{ a.cnpj }}</strong>
              @if (a.endereco) { — <em style="color:#666">{{ a.endereco }}</em> }
              @if (a.telefone) { • {{ a.telefone }} }
              @if (a.email) { <div style="color:#555">{{ a.email }}</div> }
              @if (a.site) { • {{ a.site }} }
            </li>
          }
        </ul>
      }
    </section>
  `
})
export class EditorasComponent {
  private svc = inject(EditorasServices);
  private auth = inject(AuthService);   //Ver o token
  editoras = signal<Editora[]>([]);
  carregando = signal(true);
  erro = signal<string | null>(null);

  constructor() {
    console.log("Token de acesso: ", this.auth.token());
    
    this.svc.listar().subscribe({
      next: (data) => { this.editoras.set(data); this.carregando.set(false); },
      error: () => { this.erro.set('Falha ao carregar editoras'); this.carregando.set(false); }
    });
  }
}