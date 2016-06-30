//# Global Providers
//
//** These `providers` are available in any template **

// Angular 2
import {LocationStrategy,
        HashLocationStrategy,
        PathLocationStrategy} from '@angular/common';

// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';

// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// Angular 2 Router
import { provideRouter } from '@angular/router';
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
import { routes, asyncRoutes, prefetchRouteCallbacks } from '../../app/app.routes';
import { CanDeactivateGuard } from '../../app/shared/interfaces/can-deactivate.interface';
import { AuthGuard } from '../../app/shared/auth.guard';

// Angular 2 Material 2
//
// TODO:(datatypevoid): replace with @angular2-material/all
import { MATERIAL_PROVIDERS } from './angular2-material2';

// Import any custom validators
import { UsernameValidator,
         DebouncingUsernameValidator } from '../../app/shared/validators/username.validator';
import { ValidationService } from '../../app/shared/services/validation.service';
import { AuthService } from '../../app/shared/services/auth.service';

//# Application Providers/Directives/Pipes
//
//** providers/directives/pipes that only live in our browser environment **
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),
  ...HTTP_PROVIDERS,
  ...MATERIAL_PROVIDERS,
  provideRouter(routes),
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks),
  { provide: LocationStrategy, useClass: PathLocationStrategy },
//{ provide: LocationStrategy, useClass: HashLocationStrategy },
  CanDeactivateGuard,
  AuthGuard,
  AuthService,
  ValidationService,
  UsernameValidator,
  DebouncingUsernameValidator
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
