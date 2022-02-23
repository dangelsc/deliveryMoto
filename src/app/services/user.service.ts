import { Injectable } from '@angular/core';
import { query,where, Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } 
                     from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { User  as Coleccion } from '../models/User';
//import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbpath='Moto';
  constructor(private dbb:Firestore)
  { }
  getAll():Observable<Coleccion[]>
  {
    const notesRef = collection(this.dbb, this.dbpath);
    return collectionData(notesRef, { idField: 'id'}) as Observable<Coleccion[]>;
  }
  getItem(uid:String):Observable<Coleccion>{
    const ref= collection(this.dbb,this.dbpath);
    const q=query(
        ref,where('uid','==',uid));
    return collectionData(q, { idField: 'id'}) as Observable<Coleccion>;
  }
  add(prod:Coleccion)
  {
    const ref = collection(this.dbb, this.dbpath);
    return addDoc(ref,prod);
  }
 /* edit(id:string,prod:Coleccion){
    const ref = doc(this.dbb,`${this.dbpath}/${id}`);
    return updateDoc(ref,{descripcion:prod.descripcion,
      foto:prod.foto,
      nombre:prod.nombre,
      precio:prod.precio
    });
  }*/
  search(query:String){
  
  }
}
