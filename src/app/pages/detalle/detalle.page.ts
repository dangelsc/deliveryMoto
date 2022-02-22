import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  @Input() id:string;
  pedido:Pedido=new Pedido();
  constructor(private db:PedidoService,
    private alertCtrl:AlertController,
    private control:ModalController
    ) {    
   }

  ngOnInit() {
    this.db.getItem(this.id).subscribe(server=>{
      this.pedido=server;
      console.log("datos->",server);
    })
  }
  estadoMoto(estado){
    this.pedido.estadoMoto=estado;
    this.pedido.estado=estado==="aceptado"?'envio':this.pedido.estado;
    this.db.edit(this.pedido.id,this.pedido).then(
      async s=>{
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Cambio estado',
        subHeader: 'Confirmado el cambio de estado',
        message: 'Confirmado',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      this.control.dismiss();
    });
  }
  estadoPedido(){}
}
