import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Questionario, Grupo, Questao, QuestaoAberta, Alternativa } from './dados';
import { AuthService } from './core/auth.service';

@Injectable()
export class ServicoService {
  /*private usuarioSource = new BehaviorSubject({ usuario: null, key: '' });
  public currentUsuario = this.usuarioSource.asObservable();
  public usuarios: Usuario[] = [];*/
  private contatoSource = new BehaviorSubject({contato: null, key: ''});
  public currentContato = this.contatoSource.asObservable();
  addButton: string = 'Adicionar';
  titulo: string = 'Cadastrar Questionário';
  constructor(private bd: AngularFireDatabase, private auth: AuthService) { }

  insertUsuario(usuario: Usuario): void {
    let uid = this.auth.getUid();
    this.bd.list('prj/usuario').push(usuario)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  addQuestionario(q: Questionario): void {
    console.log( q);
    let uid = this.auth.getUid();
    this.bd.list(`prj/usuario/${uid}/questionarios/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAllUsuario(usuariokey:string) {
    return this.bd.list('prj/usuario',
      ref => ref.orderByChild('prj/usuario/usuario')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  getAllQuestionario(usuariokey:string) {
    return this.auth.uid == ''? null :
    this.bd.list(`prj/usuario/${this.auth.uid}/questionarios/`,
      ref => ref.orderByChild('prj/usuario/questionarios/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }


  getAllGrupo(usuariokey:string, questionariokey:string) {
    return this.bd.list(`prj/usuario/${usuariokey}/questionarios/${questionariokey}/grupos`,
      ref => ref.orderByChild('prj/usuario/questionarios/grupos/titulo')
    )
      .snapshotChanges() /* pegar as mudanças */
      .pipe(
        /* mapeamento das mudanças */
        map(changes => {
          /* ... são todas as demais propriedades do objeto JSON que está no BD */
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
  
   addQuestion(q: QuestaoAberta, usuariokey: string, questaokey): void {
    console.log(q);
    let uid = this.auth.getUid();
    this.bd.list(`prj/usuario/${uid}/questionarios/Questoes/`).push(q)
      .then((result: any) => {
        console.log(result.key);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }


}