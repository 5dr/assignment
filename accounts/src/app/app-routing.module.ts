import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./home/account/account.module').then( m => m.AccountPageModule)
},
//   {
//     path: 'home',
//     children:[
// {
//   path: '',
//   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
// },{
//     path: 'account',
//     loadChildren: () => import('./home/account/account.module').then( m => m.AccountPageModule)
// },

//     ]

//   },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
