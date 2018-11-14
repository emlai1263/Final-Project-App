import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listItems(){
    return this.afs.collection('/Items').snapshotChanges().map(actions => {
      return actions.map( item=> {
        const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          data['id'] = id;
          return data;
      });
    });
  }

addItem(value){
  return new Promise<any>((resolve, reject) => {
    var item = {
      description: value.description,
      name: value.name,
      atk: parseInt(value.atk),
      def: parseInt(value.def),
      magic: parseInt(value.magic),
      magicDef: parseInt(value.magicDef),
      price: parseInt(value.price)
    };
    this.afs.collection('/Items').add(item)
    .then(
      (res) => {
        resolve(res)
      },
        err => reject(err)
    )
  })
}

deleteItem(id){
  this.afs.doc('/Items/' + id).delete();
}
updateItem(id, data){
  this.afs.doc('/Items/' + id).update(data);
}

}