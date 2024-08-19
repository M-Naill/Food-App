import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  // function intercept return the request so we make any change in it 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //declare and intinilize the base url and token
    const baseUrl='https://upskilling-egypt.com:3006/api/v1/';
    const token = localStorage.getItem('userToken')

    //declare new variable that contain a clone from the url
    let newRequest = request.clone({
    // here we need to add the request comes from the http request from the service and concat with the base url
      url:baseUrl+request.url,
      // we use setHeaders here to add the token to the request 
      setHeaders:{
        'Authorization':`${token}`
      }
    })

    // return the new request after modification 
    return next.handle(newRequest);
  }
}
