import { user } from './user.model';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  initLimet: string="5";
  initSkip: string;
  skip: number = 0;
  total: number = 0;
  url: string = 'assets/icon/time.png';
  dataUser: any[];
  users: user[] = [];
  masterCheck:boolean=false;
  searchKey=''

  constructor (private router: Router,private service: HomeService, private http: HttpClient,private cd:ChangeDetectorRef) {}

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }

  async getDataUser(event?) {
    this.dataUser=[]
    this.initSkip=this.skip.toString()

    console.log(this.initSkip)
    await this.service.getDataUser("10", this.initSkip).subscribe(
      (res) => {
        console.log(res);
        this.dataUser = res;
        console.log(this.dataUser);
        this.dataUser.forEach((element) => {
          this.users.push({
            id:element._id,
            userNumber: element.number,
            totalServices: element.total_services,
            totalBill: element.total_bill,
            checkbox:false
          });
        });
        this.skip=this.users.length
      },
      (err) => {
        console.log(err);
      }
    );

    if(event){
      event.target.complete();
    }
  }

  ionViewWillEnter() {
    this.skip=0
    this.users=[]
    this.total=0
    this.getDataUser();

  }

  public account(user:user){
    this.router.navigate(['account'],{queryParams:
      {
        id:user.id,
        userNumber:user.userNumber,
        totalServices:user.totalServices,
        totalBill:user.totalBill
      }});
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

    console.log(event['detail'].checked)

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




  async search(event) {
    var key:string=event.target.value
    console.log(key)

    if(key.trim().length>0){
       this.users=[]
       await this.service.getfilterUser(key).subscribe(
       (res) => {
          console.log(res);
          this.dataUser = res;
          console.log(this.dataUser);
          this.dataUser.forEach((element) => {
              this.users.push({
              id:element._id,
              userNumber: element.number,
              totalServices: element.total_services,
              totalBill: element.total_bill,
              checkbox:false
        });
      });
    },
    (err) => {
      console.log(err);
    }
  );
}else{
  this.skip=0
    this.users=[]
    this.total=0
  this.getDataUser()
}
}

load(event){
  setTimeout(() => {
    this.getDataUser(event)
  }, 500);

}

}

