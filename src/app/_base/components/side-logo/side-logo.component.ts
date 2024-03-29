import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-logo',
  templateUrl: './side-logo.component.html',
  styleUrls: ['./side-logo.component.scss'],
})
export class SideLogoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToProfile() {
    this.router.navigate(['users/profile/edit']);
  }
}
