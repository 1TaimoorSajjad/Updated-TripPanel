import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
})
export class UserviewComponent implements OnInit {
  @Input() user: any;
  @Output() closeView = new EventEmitter<void>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
  onCloseView() {
    this.closeView.emit();
  }
}
