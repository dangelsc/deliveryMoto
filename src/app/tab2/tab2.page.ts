import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DetallePage } from '../pages/detalle/detalle.page';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lista=[];
  constructor(
    private db:PedidoService
    ,private cd:ChangeDetectorRef
    ,private modalCtrl:ModalController
    ,private alertCtrl: AlertController
    ) {
    this.db.getAllAceptado().then(serve=>{
      
      serve.subscribe(s=>{
        console.log("datos",s);
        this.lista=s;
      });
      this.cd.detectChanges();
    })

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
