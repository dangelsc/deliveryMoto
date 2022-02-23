import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DetallePage } from '../pages/detalle/detalle.page';
import { LoginPage } from '../pages/login/login.page';
import { AuthenticationService } from '../services/Authentication.service';
import { PedidoService } from   "../services/pedido.service";
import { UserService } from '../services/user.service';
//import { ProductoService } from '../services/producto.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lista=[];
  uid:String;
  constructor(
    private db:PedidoService,
    private dbuser:UserService
    ,private cd:ChangeDetectorRef
    ,private modalCtrl:ModalController
    ,private alertCtrl: AlertController
    ,private aut:AuthenticationService
    ) {
      
      this.init();
  }
  async init(){
    let ver= await this.aut.isLogin();    
      if(!ver){
        const modal = await this.modalCtrl.create({
          component: LoginPage,         
          breakpoints:[0,0.5,0.8],
          initialBreakpoint:1
        })
        await modal.present()
        await modal.onDidDismiss();
      }
      //moto@moto.com
      //motomoto
      this.aut.userDetalle().then(dato=>{
        this.uid=dato.uid;
        console.log("uid",this.uid);
        this.dbuser.getItem(this.uid).subscribe(s=>{
          console.log("user",s);
              this.db.getAll(s[0].id).then(async serve=>{
            serve.subscribe(s_lista=>{
              
              let x=s_lista.map(s=>{
                s.fecha=new Date(s.fecha);
                return s;
              })
              console.log("datos",s_lista);
              this.lista=s_lista;

            });
            this.cd.detectChanges();
          });
        });
      });
      

    
  }
  async opendetaill(pedi){
    console.log(pedi);
    const modal = await this.modalCtrl.create({
      component: //LoginPage, 
      DetallePage,
      componentProps:{id:pedi.id},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:1
    })
    return await modal.present();
  }
}
