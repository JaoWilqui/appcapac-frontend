import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'search-btn',
  templateUrl: './search-btn.component.html',
  styleUrls: ['./search-btn.component.scss'],
})
export class SearchBtnComponent implements OnInit {
  @Input('disabled') isDisabled: boolean;
  @Input() icon: string;
  @Output('clickSearch') emitButtonEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  action() {
    this.emitButtonEvent.emit('');
  }
}
