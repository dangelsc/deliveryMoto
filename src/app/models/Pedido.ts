export class Pedido{
    id?:String|null;
    cliente?={
        /*id:String,
        nombre:String,
        apellidos:String*/
    };
    estado:string='pendiente';
    detalle=[];
    //cantidad?:Number;
    fecha?:Date;
    total?:Number;
    moto?:string;
    estadoMoto?:string;
    estadoPedido?:string;
    //constructor(){}
}