import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/mergeMap';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class backendProvider {
	signUpUri = 'https://cs422.azurewebsites.net/api/NewUser?code=IxiS83qkqmtx7nPg6Ye2mic5s3ir9TUTPt9siwj8Hjqpt/426CVgjA==';
	newRecieptUri = 'https://cs422.azurewebsites.net/api/postReciept?code=/L98K2csHuyxIPkz6egB0LmACFiR287szgVVZTzMoQRxVk/ViSHUqA=='
	newPhotoUri ='https://cs422.azurewebsites.net/api/postImage?code=ETbAtMwgRxOGyufsTob8BFj9vabc8/P12gf4H6gnlre/grGoNoqSMw==';

	getRecieptsUri = 'https://cs422.azurewebsites.net/api/getReciepts?code=aGjRTHnwO1S8ck/coagl2HIAXT6PNdVlQJeTxafoFhiC3onLUEJ8aA=='
	getPhotoUri = 'https://cs422.azurewebsites.net/api/getImage?code=vju7hwo1wqatI1MtzZ31yDykvTRbi2Hee6C/9VIsALSFMUaMxWBbcA==';

	authUserUri = '';
	// getRecieptsUri = '';
  

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

 
  // POST APIs
  postNewUser(usr: any): Observable<any> {
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
    });
    options = new RequestOptions({ headers: headers });
    body = { username: usr.username, email: usr.email, password: usr.password };
    return this.http.post(this.signUpUri, body, options)
          .map(this.handleResponse)
          .catch(this.handleError);
  }


  createNewReciept(username: any, reciept: any, sharedUser: any): Observable<any> {
    // alert('shared with: ' + sharedUser);
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
    });
    options = new RequestOptions({ headers: headers });
    body = { 
        username: username, 
        reciept_date: reciept.day, 
        amount: reciept.amount,
        category: reciept.category,
        tags: reciept.tag,
        recieptID: '1',
        store: reciept.store,
        sharedwith: sharedUser
    };
    return this.http.post(this.newRecieptUri, body, options)
		.map(this.handleResponse)
		.catch(this.handleError);
  }


  newPhoto(recieptID: any, photo: any): Observable<any> {
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
    });
    options = new RequestOptions({ headers: headers });
    body = { recieptID: recieptID, photo: photo };
    return this.http.post(this.newPhotoUri, body, options)
		.map(this.handleResponse)
		.catch(this.handleError);
  }


  // GET APIs
  getReciepts(username: any): Observable<any> {
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
      });
    
    options = new RequestOptions({ headers: headers });
    body = { username: username};
    
    return this.http.post(this.getRecieptsUri, body, options)
          .map(this.handleResponse)
          .catch(this.handleError);
  }

  getPhoto(recieptID: any): Observable<any> {
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
      });
    
    options = new RequestOptions({ headers: headers });
    body = { recieptID: recieptID};
    
    return this.http.post(this.getPhotoUri, body, options)
          .map(this.handleResponse)
          .catch(this.handleError);
  }

  authUser(selectedUser: any): Observable<any> {
    let headers, options, body;
    headers = new Headers({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': 'Basic'
      });
    
    options = new RequestOptions({ headers: headers });
    body = { username: selectedUser.username, password: selectedUser.password};
    
    return this.http.post(this.authUser, body, options)
          .map(this.handleResponse)
          .catch(this.handleError);
  }

  

  // error handling stuff
  private handleResponse (res: Response) {
    return  res.json() || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    
    if (error instanceof Response) {
        const body = error.json() || '';
        console.log(body);
        errMsg = body.non_field_errors[0];
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}

