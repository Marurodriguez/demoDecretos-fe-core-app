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



  //asientos/abm/new
  {
    path: 'cuentas',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/cuentacontable/cuentacontable.module').then(m => m.CuentaContableModule)
  },
  {
    path: 'asientos',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/asiento/asiento.module').then(m => m.AsientoModule)
  },
  {
    path: 'bancos',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/banco/banco.module').then(m => m.BancoModule)
  },
  {
    path: 'saldoinicial',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/saldo-inicial/saldo-inicial.module').then(m => m.SaldoInicialModule)
  },
  {
    path: 'libromayor',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/libro-mayor/libro-mayor.module').then(m => m.LibroMayorModule)
  },
  {
    path: 'balance',
    // pathMatch: 'full',
    loadChildren: () => import('../../pages/balance/balance.module').then(m => m.BalanceModule)
  },
  // {
  //   path: 'clientes/:parametros',
  //   loadChildren: () => import('../../pages/clientes/clientes.module').then(m => m.ClientesModule)
  // },
  // {
  //   path: 'clientes/view/:uuid',
  //   loadChildren: () => import('../../pages/clientes/clientes.module').then(m => m.ClientesModule)
  // },
  // {
  //   path: 'validate/:serial/:pcid',
  //   loadChildren: () => import('../../pages/validar/home.module').then(m => m.HomeModule)
  // }
];
