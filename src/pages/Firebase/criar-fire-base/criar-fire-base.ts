import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebasePage } from '../firebase';

/**
 * Generated class for the CriarFireBasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-fire-base',
  templateUrl: 'criar-fire-base.html',
})
export class CriarFireBasePage {
  private formItem: FormGroup;
  public loading
  public resultCreate: any;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    public db: AngularFirestore,
    public fb: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController)
  {
    this.formItem = fb.group({
      id: [null],
      nome: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      apelido: [null, [Validators.required]],
      nota: [null, [Validators.required]]
    })
    this.itemsCollection = db.collection<any>('xerto');
  }

  ionViewDidLoad() {
  }

  submit(){
    this.showLoader();

    const id = this.db.createId();

    this.formItem.setValue({
      id: id,
      nome: this.formItem.value.nome,
      tipo: this.formItem.value.tipo,
      valor: this.formItem.value.valor,
      apelido: this.formItem.value.apelido,
      nota: this.formItem.value.nota
    })
    this.itemsCollection.doc(id).set(this.formItem.value).then((res)=>{
      this.loading.dismiss()
      this.mostraMenssagem('Item criado com sucesso', 2500)
      this.navCtrl.setRoot(FirebasePage)
    })
  }


  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    this.loading.present();
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
