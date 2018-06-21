import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-firebase',
  templateUrl: 'firebase.html'
})
export class FirebasePage {

  private itemsCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;
  public putas: any = []
  constructor(
    public db: AngularFirestore,
    public navCtrl: NavController,
    public modal: ModalController,
    public toastCtrl: ToastController) {
    this.itemsCollection = db.collection<any>('xerto');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(item => {
      item.forEach(element => {
        this.putas = this.putas.concat(element)
      })
      console.log('teste', this.putas)
      this.mostraMenssagem('Busca realizada com sucesso!', 1000)
    })
  }

  addItem(){
    this.navCtrl.push('CriarFireBasePage')
  }

  deleteItem(id){
    this.itemsCollection.doc(id).delete();
    this.mostraMenssagem('Produto deletado com sucesso!', 2500)
  }

  editItem(item){
    console.log(item)

    this.navCtrl.push("EditarFirebasePage", {item: item})
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
