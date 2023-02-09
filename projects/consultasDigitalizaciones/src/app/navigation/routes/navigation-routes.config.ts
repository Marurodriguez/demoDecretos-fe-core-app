import { RouteInfo } from "./vertical-menu.metadata";

export const HROUTES: RouteInfo[] = [
  {
    path: "/documentos/listado",
    title: "Expedientes",
    icon: "fa-solid fa-folder-open",
    class: "dropdown nav-item",
    badge: "",
    badgeClass: "",
    isExternalLink: false,
    submenu: [],
    roles: ['user', 'admin']
  },

  /*
   {
     path: "/cuentas",
     title: "Cuentas",
     icon: "far fa-folder-tree",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/bancos/listado",
     title: "Bancos",
     icon: "far fa-university",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/saldoinicial/listado",
     title: "Ingresar Saldos Iniciales",
     icon: "fal fa-flag",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/asientos/abm/new",
     title: "Crear Asiento",
     icon: "fal fa-donate",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/asientos/listado",
     title: "Libro Diario",
     icon: "fal fa-book",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/libromayor/listado",
     title: "Libro Mayor",
     icon: "far fa-file-invoice-dollar",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/balance/listado",
     title: "Balance",
     icon: "fal fa-blanket",
     class: "dropdown nav-item",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['user', 'admin']
   },
   {
     path: "/encuesta/listado",
     title: "Listado",
     icon: "fal fa-th-list",
     class: "dropdown nav-item has-sub",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['admin', 'user', 'bluemail']
   },
   {
     path: "/encuesta/test",
     title: "Test",
     icon: "far fa-arrow-alt-right",
     class: "dropdown nav-item has-sub",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['admin', 'user', 'bluemail']
   },
   {
     path: "/usuarios/listado",
     title: "Administrar Usuarios",
     icon: "fal fa-users",
     class: "dropdown nav-item has-sub",
     badge: "",
     badgeClass: "",
     isExternalLink: false,
     submenu: [],
     roles: ['admin']
   },
   */
];
