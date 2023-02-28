import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'documentos/listado',
    pathMatch: 'full'
  },
  {
    path: 'documentos',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/documento/documento.module').then(m => m.DocumentoModule)
  },

];
