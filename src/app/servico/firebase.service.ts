import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

/* importar a ferramenta do JS */
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  /* Primeira ferramenta do firebase */
  frr: AngularFirestoreCollection

  /* Ferramenta que conecta a coleção do firebase, (FIREBASE TRABALHA COM COLEÇÕES) */
  constructor(private AngularFirestore: AngularFirestore) {
    /* Passando as coleções do firebase para nossa variavel */
    this.frr = AngularFirestore.collection('lstP')
  }

  /* Método de cadastro */
  cadastro(laranja: any) {
    return this.frr.add(laranja);
  }

  /* Método de consulta */
  consultinha(id: any) {
    return this.frr.doc(id).valueChanges();
  }

  /* Método de consulta */
  consulta() {
    return this.frr.snapshotChanges().pipe(
      map(acoes => {
        return acoes.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {a, ...data }/* sitaxe spread do JavaScript */
        })
      })
    );
  }

  /* Método de edição */
  edicao(laranja: any, id: any) {
    return this.frr.doc(id).update(laranja);
  }

  /* Método de exclusão */
  exclusao(id: any) {
    return this.frr.doc(id).delete();
  }
}

