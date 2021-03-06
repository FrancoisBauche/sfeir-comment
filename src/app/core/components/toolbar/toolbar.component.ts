import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  connected = false;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private _router: Router
    ) {
    this._router.events.subscribe(() => {
      this.connected = !!firebase.auth().currentUser;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.doLogout()
      .then(() => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log('Logout error', error);
      });
  }

  public get router() {
    return this._router;
  }

}
