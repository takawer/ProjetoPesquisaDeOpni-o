export class Usuario {
  usuario: string;
  questionarios: Questionario[];
}

export class Questionario {
  titulo: string;
  inicio: number; //firebase.firestore.Timestamp;
  fim: number; //firebase.firestore.Timestamp;
  grupos: Grupo[];
}

export class Grupo {
  titulo: string;
  fechadas: Questao[];
  abertas: QuestaoAberta[];
}

export class Questao {
  enunciado: string;
  alternativas: Alternativa[];
  ismult: boolean;
}

export class QuestaoAberta {
  enunciado: string;
  
}

export class Alternativa {
  texto: string;
  contador: number = 0;
}