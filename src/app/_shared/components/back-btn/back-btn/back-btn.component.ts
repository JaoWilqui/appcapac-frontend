import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss'],
})
export class BackBtnComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  btnClick() {
    this.onClick.emit('');
  }
}
