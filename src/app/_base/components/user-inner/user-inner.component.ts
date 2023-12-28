import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../../_shared/models/user.model';
import { getUser } from '../../../_store/user/user.actions';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss'],
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
})
export class UserInnerComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  user: User = new User();
  show = false;
  role: string;
  @Input() isExpanded: boolean = false;

  constructor(private store: Store<User>, private authService: AuthService) {
    this.store.select(getUser).subscribe((data) => {
      console.log(data);
    });
  }

  logout(): void {
    this.authService.logout('auth');
  }

  onClickOutside(event: any) {
    const clickButton = this.toggleButton?.nativeElement.contains(event.target);
    const clickedInside = this.menu?.nativeElement?.contains(event.target);
    if (!clickedInside && !clickButton) {
      this.show = false;
    }
  }

  ngOnInit(): void {}
}
