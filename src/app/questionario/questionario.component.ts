import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { Usuario, Questionario } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import {Timestamp} from 'firebase.firestore';
/* instalar a biblioteca @firebase/util */
import firebase from 'firebase/app'
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {
  private titulo: string;
  private inicio: string;
  private fim: string;
  private key: string = '';
  private questionario: Questionario;
  private questionarios: Observable<any>;
  private usuariokey: string;
  constructor(private servico: ServicoService, private router:Router, private route: ActivatedRoute , private auth:AuthService) { }

 ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = (parametros['usuariokey'] != undefined ? parametros['usuariokey'] : '');
      this.questionarios = this.servico.getAllQuestionario(this.usuariokey);
    });
  }

  size(obj) {
    return obj ? Object.keys(obj).length : 0;
  }

  toData(data):number {
    let temp = data.split('/');
    return new Date(parseInt(temp[2]), parseInt(temp[1]) - 1, parseInt(temp[0])).getTime();
  }

  formatDate(timestamp):string{
    let d = new Date(timestamp);
    return (d.getDate() < 10? "0"+d.getDate() : d.getDate())  +"/"+
          (d.getMonth() < 9? "0"+(d.getMonth()+1) : d.getMonth()+1)  +"/"+
          d.getFullYear();
  }

  salvarQuestionario() {
    if (this.usuariokey != undefined) {
      let questionario: Questionario = new Questionario();
      questionario.titulo = this.titulo;
      questionario.inicio = this.toData(this.inicio);
      questionario.fim = this.toData(this.fim);
      this.servico.addQuestionario(questionario);
    }
    else{
      alert("Usuário não definido")
    }
  }

  goto(questionariokey:string):void{
    console.log("usuariokey:" + this.usuariokey +", questionariokey"+ questionariokey );
    this.router.navigate(['/grupo/',this.usuariokey,questionariokey]);
  }

  AdicionarQuestao(questionariokey:string): void {
    console.log("Indo para a Tela de Cadastrar Questão \n questionariokey: "+questionariokey);
    window.localStorage.setItem('questionariokey', questionariokey);
    this.router.navigate(['grupo']);
  }

}