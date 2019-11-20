import { Component, OnInit } from '@angular/core';
//import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/UserData';
import * as $ from 'jquery';
import data from '../../../assets/company.json';
import { MenuController , NavController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  //private companies = data;
  tableStlye = 'bootstrap';
  customRowClass = false;
  user: User;
  userdata: UserData;
  constructor(
    private menu: MenuController,
    private authService: AuthService) {
   // console.log(this.companies); 
    this.menu.enable(true);
    
  }
 
  ngOnInit() {
    
    
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.getAllStudents()
      }
    );

   // this.authService.userdata(user["id"]).subscribe(
     // userdata => {
       // this.userdata = userdata;
      //}
    //);
  }
  getAllStudents() {
    this.authService.userdata().subscribe(
      userdata => {
        this.userdata = userdata;
      }
    );

  }

  switchStyle() {
    if(this.tableStlye == 'dark'){
      this.tableStlye = 'bootstrap';
    }else{
      this.tableStlye ='dark';

      }
  }

  getRowClass(row) {
    console.log('class: ', row);
    const isMale = row.gender == 'male';

    if (!this.customRowClass){
      return{};
    }
    return{
      'male-row': isMale,
      'female-row': !isMale
    }

  }

  async open(row) {
    alert(row.html);
  }

  delete(row) {
    //Delete item in Student data
    this.authService.deleteItem(row.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllStudents() ;
    });
  }
}