import { user } from './user.model';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  initLimet=10;
  initSkip=1;
  total: number = 0;
  url: string = 'assets/icon/time.png';
  dataUser: any;
  users: user[] = [];
  masterCheck:boolean=false;
  searchKey=''

  constructor(private service: HomeService, private http: HttpClient,private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.getDataUser();
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  async getDataUser() {

    await this.service.getDataUser().subscribe(
      (res) => {
        console.log(res);
        this.dataUser = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  convert() {
    this.dataUser.forEach((element) => {
      this.users.push({
        userNumber: element.number,
        totalServices: element.total_services,
        totalBill: element.total_bill,
        checkbox:false
      });
    });
    console.log(this.users);
  }

  ionViewWillEnter() {
    this.users=[]
    this.convert();
    this.total=0
  }


  checkMaster1() {

    setTimeout(()=>{
        this.masterCheck=true;
      this.users.forEach(obj => {
        obj.checkbox = this.masterCheck
      });
    },0);
  }


  checkMaster2() {
    setTimeout(()=>{
        this.masterCheck=false
      this.users.forEach(obj => {
        obj.checkbox = this.masterCheck
      });
    },0);
  }


  checkEvent(event,totalBill) {


    if(event['detail'].checked === true){
      this.total += totalBill
    }else{
      this.total -= totalBill
    }

    const totalItems = this.users.length;
    let checked = 0;
    this.users.map(obj => {
      if (obj.checkbox) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      this.masterCheck = true;
    } else if (checked == totalItems) {
      this.masterCheck = true;
    } else {
      this.masterCheck = false;
      this.total=0
    }

    (this.total).toFixed(2)
  }
}
