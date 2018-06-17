import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { File } from '@ionic-native/file';


/**
 * Generated class for the CriarArquivoTextoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-arquivo-texto',
  templateUrl: 'criar-arquivo-texto.html',
})
export class CriarArquivoTextoPage {

  public diretorio: any;
  public nomeArquivo:any;
  public texto: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public file: File,
    public alertCtrl: AlertController,
    public app: App) {
      this.diretorio = file.dataDirectory;
      this.nomeArquivo = 'arquivo.txt';
  }

  ionViewDidLoad() {
  }

  submit(){
    this.file.writeFile(this.diretorio, this.nomeArquivo, this.texto, { replace: true })
    .then((result) => {
      let nav = this.app.getRootNav();
      nav.setRoot('ArquivoTextPage');
    })
    .catch((err) => this.alerta("Atenção", "Erro ao criar arquivo texto " + JSON.stringify(err)));
  }

  alerta(titulo, mensagem){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}
