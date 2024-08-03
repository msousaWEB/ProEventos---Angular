import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  isCollapsed = false;

  public eventos: any = [];
  public eventosFiltrados: any = [];

  widthImg = 10;
  heightImg = 6;
  marginImg = 0.2;

  private Filtro = '';

  public get filtroLista() {
    return this.Filtro;
  }

  public set filtroLista(value: string) {
    this.Filtro = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public getEventos(): void {
    this.http.get('https://localhost:44354/api/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      error => console.log(error),
    );
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getEventos();
  }

}
