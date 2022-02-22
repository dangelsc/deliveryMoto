import { Injectable } from '@angular/core';
import { query,where,  Firestore, collection, collectionData,   doc, docData, addDoc, deleteDoc, updateDoc } 
                     from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { Pedido  as Coleccion } from '../models/Pedido';
import { AuthenticationService } from './Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private dbpath='Pedido';
  constructor(private dbb:Firestore,
      private aut:AuthenticationService
      //,private dbb:Firestore
    )
  { }
  async getAll(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      try{
          const notesRef = collection(
            this.dbb,this.dbpath);
          const q=query(
            notesRef,where('estado','==','Proceso'));
          resolve(
            collectionData(q,{ idField: 'id'}
            ));// as Observable<Coleccion[]>;
        //});
      }catch(e){
        reject(e);
      }
    });
  }
  async getAllAceptado(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      try{
          const notesRef = collection(
            this.dbb,this.dbpath);
          const q=query(
            notesRef,where('estado','==','envio')
            //,where('idmoto','==','')
            );
          resolve(
            collectionData(q,{ idField: 'id'}
            ));// as Observable<Coleccion[]>;
        //});
      }catch(e){
        reject(e);
      }
    });
  }
  getItem(id:string):Observable<Coleccion>{
    console.log("id=>",id);
    const ref= doc(this.dbb,`${this.dbpath}/${id}`);
    //this.dbb.app.options.FieldValue.serverTimestamp()
    return docData(ref, { idField: 'id'}) as Observable<Coleccion>;
  }
  add(prod:any)
  {
    console.log("*1");
    const ref = collection(this.dbb, this.dbpath);
    console.log("*2");
    let xx={
      cliente:prod.cliente,
      detalle:prod.detalle,
      fecha:prod.fecha,
      total:prod.total
  };
    
    return addDoc(ref,xx);
  }
  edit(id:String,prod:Coleccion){
    const ref = doc(this.dbb,`${this.dbpath}/${id}`);
    return updateDoc(ref,
      {
      estadoMoto:prod.estadoMoto,
      estado:prod.estado,
    });
  }
  
  search(query:String){
  
  }
}
