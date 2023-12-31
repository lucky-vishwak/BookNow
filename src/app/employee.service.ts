import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { adminmodel } from './models/adminmodel';
import { room } from './models/roommodel';
import { usermodel } from './models/usermodel';
import {baseUrl,employeeServiceUrls} from './route-config'


interface responseroom{
  message:string,
  rooms:room[]
}

interface responselogin{
  message:string,
  userobj:usermodel,
  adminobj:adminmodel,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  user_active:boolean=false
  admin_active:boolean=false
  user=<usermodel>{}
  constructor(private hc:HttpClient) { 
    if(localStorage.getItem("user")!=null){
      this.user=JSON.parse(localStorage.getItem("user")||"")
      this.user_active=true
    }
    if(localStorage.getItem("admin")!=null){
      this.user=JSON.parse(localStorage.getItem("admin")||"")
      this.admin_active=true
    }
  }

  toLogin(loginObj:Object):Observable<responselogin>{
    return this.hc.post<responselogin>(`${baseUrl}${employeeServiceUrls.login}`,loginObj);
  }

  allrooms():Observable<responseroom>{
    return this.hc.get<responseroom>(`${baseUrl}${employeeServiceUrls.allRooms}`)
  }

  paginateForMyEvents(paginateObj:any):Observable<any>{
    return this.hc.post(`${baseUrl}/employee/paginate`,paginateObj)
  }
}