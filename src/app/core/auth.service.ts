import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  public msgerro = '';
  public uid = '';
  public name = '';

  private uidSource = new BehaviorSubject({ uid: '' });
  public uid$ = this.uidSource.asObservable();

  constructor(
   public afAuth: AngularFireAuth
   
 ){this.uid = this.getUid();
    this.name = this.getName();}

  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.msgerro = '';
        this.uid = this.getUid();
        this.name = this.getName();
        this.changeUid(this.uid);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }



  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.msgerro = '';
        this.uid = this.getUid();
        this.name = this.getName();
        this.changeUid(this.uid);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        .then(r => {
        this.uid = this.getUid();
        this.name = this.getName();
        this.changeUid(this.uid); /* comunica que houve uma mudança */
      });
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getUid() {
    if (this.afAuth.auth.currentUser)
      return this.afAuth.auth.currentUser.uid;
    else
      return '';
  }

  getName() {
    if (this.afAuth.auth.currentUser)
      return this.afAuth.auth.currentUser.displayName;
    else
      return '';
  }

  changeUid(uid) {
    this.uidSource.next({ uid: uid });
  }


}