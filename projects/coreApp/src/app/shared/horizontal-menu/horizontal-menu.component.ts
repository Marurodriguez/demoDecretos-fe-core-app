import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { HROUTES } from './navigation-routes.config';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthUserService } from '../auth/auth-user.service';


@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() routes = [];


  public menuItems: any[];
  public config: any = {};
  level: number = 0;
  transparentBGClass = "";
  menuPosition = 'Side';

  layoutSub: Subscription;

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authUserService: AuthUserService) {
    this.config = this.configService.templateConf;
  }

  ngOnInit() {
    this.menuItems = []; //this.routes;
    let roleUser: string = "user";
    if(this.authUserService.getUser() && this.authUserService.getUser().roles) {
      roleUser = this.authUserService.getUser().roles.toLowerCase();
    }
    for(const item of this.routes){
      let roles: string [];
      if(item.roles == undefined) {
        roles = [];
      }else {
        roles = item.roles;
      }

      if( roles.length == 0 && (roleUser == "user" || roleUser == '')) {
        this.menuItems.push(item);
      }else{
        if (roles.find(x=>x.toLowerCase() == roleUser ) != undefined) {
          this.menuItems.push(item);
        }
      }
    }
    //this.menuItems = HROUTES;
  }

  ngAfterViewInit() {

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }


    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

}
