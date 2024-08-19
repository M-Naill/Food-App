import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService
  ) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   this.spinner.show();
  //   next.handle(request).pipe(
  //     tap(
  //       (event)=> {
  //         // Handle successful events if needed (e.g., logging)
  //       },
  //       (error) => {
  //         // Handle errors if needed (e.g., showing an error message)
  //       }
  //     ),
  //     finalize(() => {
  //       this.spinner.hide();
  //     })
  //   );
  // }}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
  
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=> {
        // Handle errors here (e.g., showing an error message)
        console.error('Request failed:', error);
        return throwError(() => error); // Rethrow the error
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
  
