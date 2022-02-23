import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/Authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string='';
  password: string='';
  constructor(private auth:AuthenticationService
    ,private modalCtrl:ModalController
    ,private toastCtrl:ToastController) { }
  ngOnInit() {
  }
  loginGoogle(){
    this.auth.loginGoogle();
    this.modalCtrl.dismiss();
  }
  loginEmail(){
    this.auth.loginEmail(this.email,this.password).then(() => {
      console.log('Auth Service: loginUser: success');
      this.modalCtrl.dismiss();

    })
    .catch(async(error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code){
          const toast= await this.toastCtrl.create({
            message:`Existe errores:${error.message}`,
            duration:4000
          });
          await toast.present();
        }
        else{
          const toast= await this.toastCtrl.create({
            message:`Error de login`,
            duration:4000
          });
          await toast.present();
        }
    });
    

  }
 

}
