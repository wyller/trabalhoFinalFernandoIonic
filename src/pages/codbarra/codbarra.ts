import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the CodbarraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codbarra',
  templateUrl: 'codbarra.html',
})
export class CodbarraPage {

  public numeroCodBarra: any;
  public tipoDeCodBarra: any;

  constructor(
    public navCtrl: NavController,
    public barCode: BarcodeScanner,
    public toastCtrl: ToastController) {

  }

  lerCodBarra(){
    this.barCode.scan({
      "prompt": "Realize a leitura do codigo de barra",
      "orientation": "landscape"
    }).then((res)=>{
      this.numeroCodBarra = res.text
      this.tipoDeCodBarra = res.format
      this.mostraMenssagem('Leitura realizada com sucesso')
    }).catch((err) => {
      this.mostraMenssagem('Erro ao realizar leitura')
    })
  }

  mostraMenssagem(message: string, duration?: number) {
    let menssagem = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    menssagem.present();
  }
}
