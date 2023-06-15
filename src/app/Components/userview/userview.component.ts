import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
})
export class UserviewComponent implements OnInit {
  @Input() user: any;
  @Output() closeView = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
  onCloseView() {
    this.closeView.emit();
  }
}
