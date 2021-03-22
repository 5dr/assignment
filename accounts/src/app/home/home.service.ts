import { user } from './user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,tap,catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  users:user[];

  constructor(private http :HttpClient) { }

private handleError(error:HttpErrorResponse){
if(error.error instanceof ErrorEvent){
  console.error('An error accurred:',error.error.message)
}else{
  console.error(
    `Backend returned code ${error.status} ,`+
    `bady was : ${error.error}`
  )}
  return throwError('Something bad happened; Please try again later')
}
private extractData(res:Response){
  let body =res;
  return body || {}
}

getDataUser(lim:string,skip:string):Observable<any>{
  return this.http.get('http://localhost:3000/users?limit='+lim+'&skip='+skip,httpOptions).pipe(
    map(this.extractData),catchError(this.handleError))

}
getfilterUser(num:string):Observable<any>{
  return this.http.get('http://localhost:3000/users/'+num,httpOptions).pipe(
    map(this.extractData),catchError(this.handleError))

}

}
