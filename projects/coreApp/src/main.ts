import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  //LOG OUT CONSOLE
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
