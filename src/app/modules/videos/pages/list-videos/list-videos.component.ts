import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.scss'],
})
export class ListVideosComponent implements OnInit {
  videos = [
    {
      id: 1,
      src: 'https://www.youtube.com/embed/bXbf_sfA8yE',
      title: 'Quais são os sintomas da Depressão?',
      nome: 'teste',
    },
    {
      id: 2,
      src: 'https://www.youtube.com/embed/PIQpHVXjAt4',
      title: 'Transtorno de Ansiedade Generalizada: Como Tratar??',
      nome: 'teste2',
    },
    {
      id: 3,
      src: 'https://www.youtube.com/embed/a1C8PxeLlGo',
      title: 'CRISE DE ANSIEDADE: SINTOMAS da CRISE de ANSIEDADE (2021)',
      nome: 'teste 3',
    },
  ];

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {}

  navigateTo(param: string, id?: number) {
    if (id) {
      this.router.navigate([param + '/' + `${id}`], {
        relativeTo: this.activeRoute,
      });
      return;
    }
    this.router.navigate([param], {
      relativeTo: this.activeRoute,
    });
  }
}
