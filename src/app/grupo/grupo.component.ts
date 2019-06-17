import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { Usuario, Questionario, QuestaoAberta } from '../dados';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import {Timestamp} from 'firebase.firestore';
/* instalar a biblioteca @firebase/util */
import firebase from 'firebase/app'
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  private tituloaberto: string = 'Questão Aberta';
  private addButton: string = 'Adicionar Questão';
  private enunciado: string;
  private questionarios: Observable<any>;
  private questoes: Observable<any>;
  private usuariokey: string;
  private questaoaberta: QuestaoAberta;
  private questionariokey: string = '';
  private questaokey: string = '';
  private x: number;

  form: FormGroup

  btnText: string = 'Questão Aberta';

  btnTexto: string = 'Questão Fechada';

  toggle(): void {
    if (this.btnText === 'Esconder Questão Aberta'){
      this.btnText = ' Questão Aberta ';
    }else{
      this.btnText = 'Esconder Questão Aberta'
    }
  }

  toggler(): void {
    if (this.btnTexto === 'Esconder Questão Fechada'){
      this.btnTexto = 'Questão Fechada';
    }else{
      this.btnTexto = 'Esconder Questão Fechada'
    }
  }

  constructor(private fb: FormBuilder, private servico: ServicoService, private router:Router, private route: ActivatedRoute , private auth:AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(parametros => {
      this.usuariokey = (parametros['usuariokey'] != undefined ? parametros['usuariokey'] : '');
      this.questionarios = this.servico.getAllQuestionario(this.usuariokey);
    });
  }

  insertedID: string;
  insertedName: string;


  fields = this.fb.group({
    elementArray: this.fb.array([this.createElementData('1', '')])
  });

  

  createNew() {
    const newRow = this.createElementData(this.insertedID, this.insertedName);
    this.elementArray.push(newRow);
  }

  get elementArray(): FormArray {
    return this.fields.get("elementArray") as FormArray;
  }

  createElementData(passedID, passedName): FormGroup {
    if (passedID == 0 || !passedID) {
      passedID = this.elementArray.length + 1;
    }
    return this.fb.group({
      id: [passedID],
      name: [passedName],
      statusVal: false
    });
  }

  showData() {
    if (this.fields.value.elementArray.length > 0) {
      console.log(this.fields.value.elementArray);
    }
  }

  salvarQuestaoAberta() {
    if (this.usuariokey != undefined) {
      let questaoaberta: QuestaoAberta = new QuestaoAberta();
      questaoaberta.enunciado = this.enunciado;
      this.servico.addQuestion(this.questaoaberta, this.usuariokey,window.localStorage.getItem('questionariokey'));
    }
    else{
      alert("Usuário não definido")
    }
  }

}

export class Element {
  id: string;
  name: string;
  statusVal: boolean;
}

