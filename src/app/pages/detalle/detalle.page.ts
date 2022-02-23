import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Pedido } from 'src/app/models/Pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Map, tileLayer, marker, icon } from 'leaflet';
/*
usuario-> crud
moto-> crud
producto-> crud
pedidos->(asignar moto, cancelar)
pedidos-> (lista de envios)
pedidos -> terminador
clientes->(listado,dar de baja)
*/ 

/*
cliente
  calificar entrega
moto
  ---
*/




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
   ngAfterViewInit() {
    this.db.getItem(this.id).subscribe(server=>{
      this.pedido=server;
      console.log("datos->",server);
      this.initMap();
    })
  }
  initMap() {
    const map = new Map('map').setView([this.pedido.lat,this.pedido.lon],12);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const customMarkerIcon = icon({
      iconUrl: 'assets/images/custom-marker-icon.png',
      iconSize: [64, 64], 
      popupAnchor: [0, -20]
    });
    marker([this.pedido.lat,this.pedido.lon], {icon: customMarkerIcon})
    .addTo(map).openPopup();
  }
  ngOnInit() {
   
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
