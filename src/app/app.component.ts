import { Component, ViewEncapsulation, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private auth:AuthService, private changeDetector: ChangeDetectorRef) { }
  ngOnInit() {
    this.auth.uid$.subscribe(data => {
      this.changeDetector.detectChanges();
    });
  }

}