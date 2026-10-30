import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { JWTTokenService } from "../services/jwt-token.service";

const API_BASE_URL = "http://localhost:3000";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(JWTTokenService).getAccessToken();
  const request = req.clone({
    url: req.url.startsWith("http") ? req.url : API_BASE_URL + req.url,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 400) {
        console.log("error 400", error.status);
      } else {
        console.log(`Error happended with status of ${error.status}`, error);
      }

      return throwError(() => error);
    }),
  );
};
