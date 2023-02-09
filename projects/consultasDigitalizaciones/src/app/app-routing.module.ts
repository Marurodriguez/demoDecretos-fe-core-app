import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./navigation/full/full-layout.component";
import { ContentLayoutComponent } from "./navigation/content/content-layout.component";

import { Full_ROUTES } from "./navigation/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./navigation/routes/content-layout.routes";

import { AuthGuard } from '../../../coreApp/src/app/shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
