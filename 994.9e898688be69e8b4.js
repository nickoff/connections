"use strict";(self.webpackChunkconnections=self.webpackChunkconnections||[]).push([[994],{3994:(S,d,r)=>{r.r(d),r.d(d,{routes:()=>w});var _=r(8036),l=r(6814),m=r(1993),i=r(6223),u=r(6007),c=r(9190),p=r(3539),f=r(672),b=r(3099),t=r(9212),h=r(4221),x=r(3481);function C(o,a){1&o&&t._UZ(0,"mat-progress-bar",19)}function Z(o,a){1&o&&(t.TgZ(0,"span"),t._uU(1,"Logout"),t.qZA())}function P(o,a){1&o&&t._UZ(0,"mat-progress-bar",19)}function N(o,a){1&o&&(t.TgZ(0,"span"),t._uU(1,"Edit name"),t.qZA())}function y(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.editName())}),t.ALo(1,"async"),t.YNc(2,P,1,0,"mat-progress-bar",4),t.ALo(3,"async"),t.YNc(4,N,2,0,"span",5),t.ALo(5,"async"),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("disabled",t.lcZ(1,3,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(3,5,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(5,7,e.isLoading$))}}function O(o,a){1&o&&t._UZ(0,"mat-progress-bar",19)}function v(o,a){1&o&&(t.TgZ(0,"span"),t._uU(1,"Save"),t.qZA())}function A(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.editSave())}),t.ALo(1,"async"),t.YNc(2,O,1,0,"mat-progress-bar",4),t.ALo(3,"async"),t.YNc(4,v,2,0,"span",5),t.ALo(5,"async"),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("disabled",t.lcZ(1,3,e.isLoading$)||e.isButtonDisabled),t.xp6(2),t.Q6J("ngIf",t.lcZ(3,5,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(5,7,e.isLoading$))}}function T(o,a){1&o&&t._UZ(0,"mat-progress-bar",19)}function L(o,a){1&o&&(t.TgZ(0,"span"),t._uU(1,"Cancel"),t.qZA())}function U(o,a){if(1&o){const e=t.EpF();t.TgZ(0,"button",20),t.NdJ("click",function(){t.CHM(e);const n=t.oxw();return t.KtG(n.editCancel())}),t.ALo(1,"async"),t.YNc(2,T,1,0,"mat-progress-bar",4),t.ALo(3,"async"),t.YNc(4,L,2,0,"span",5),t.ALo(5,"async"),t.qZA()}if(2&o){const e=t.oxw();t.Q6J("disabled",t.lcZ(1,3,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(3,5,e.isLoading$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(5,7,e.isLoading$))}}function M(o,a){if(1&o&&(t.TgZ(0,"span",21),t._uU(1),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Oqu(e.nameErrors)}}const w=[{path:"",component:(()=>{class o{constructor(e,s,n,g,J){this.datePipe=e,this.store=s,this.destroyRef=n,this.cdr=g,this.loadingService=J,this.isNameEditable=!1,this.isSubmitted=!1,this.isButtonDisabled=!1,this.isLoading$=this.loadingService.getLoading,this.profileUser=new i.cw({email:new i.NI("",{nonNullable:!0}),uid:new i.NI("",{nonNullable:!0}),name:new i.NI("",{nonNullable:!0,validators:[i.kI.required,(0,b.O)()]}),createdAt:new i.NI("",{nonNullable:!0})}),this.name=this.profileUser.controls.name,this.isShowNameError=!1,this.store.dispatch(c.Sp.getUser())}ngOnInit(){this.setUserFromStore(),this.profileUser.valueChanges.pipe((0,m.sL)(this.destroyRef)).subscribe(()=>{this.refreshErrorsState(),this.isButtonDisabled=!this.profileUser.valid,this.cdr.markForCheck()})}logOut(){this.store.dispatch(c.Sp.logoutUser())}editName(){this.isNameEditable=!0}editSave(){if(this.isSubmitted=!0,this.refreshErrorsState(),!this.profileUser.valid)return;const e=this.profileUser.value.name;e&&this.store.dispatch(c.Sp.updateUser({newName:{name:e}}))}editCancel(){this.setUserFromStore()}setUserFromStore(){this.user$=this.store.select(c.Iw),this.user$.pipe((0,m.sL)(this.destroyRef)).subscribe(e=>{e&&this.profileUser.setValue({email:e.email?e.email.S:"",uid:e.uid?e.uid.S:"",name:e.name?e.name.S:"",createdAt:e.createdAt?this.getLocalTime(Number(e.createdAt.S)):""}),this.isNameEditable=!1,this.cdr.markForCheck()})}getShowNameError(){return null!==this.name.errors&&this.name.errors&&(this.name.dirty||this.isSubmitted)}getNameErrors(){return null!==this.name.errors&&(this.name.errors[f.FT.onlyLettersOrSpaces]&&p.bR.onlyLettersOrSpaces||this.name.errors[f.FT.required]&&p.bR.required||this.name.errors[f.FT.maxLengthName]&&p.bR.maxLengthName)}getLocalTime(e){const s=new Date(e);return this.datePipe.transform(s,"medium")||""}refreshErrorsState(){this.isShowNameError=this.getShowNameError(),this.nameErrors=this.getNameErrors()}static#t=this.\u0275fac=function(s){return new(s||o)(t.Y36(l.uU),t.Y36(h.yh),t.Y36(t.ktI),t.Y36(t.sBO),t.Y36(x.b))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-profile"]],standalone:!0,features:[t.jDz],decls:32,vars:18,consts:[[1,"profile"],[1,"profile__header"],[1,"profile__title"],["type","button",1,"logout-button",3,"disabled","click"],["mode","buffer",4,"ngIf"],[4,"ngIf"],[1,"profile__form",3,"formGroup"],[1,"form__input-label"],["for","name"],["type","text","id","name","formControlName","name",3,"readonly"],["for","email"],["type","text","id","email","formControlName","email",3,"readonly"],["for","uid"],["type","text","id","uid","formControlName","uid",3,"readonly"],["for","date"],["type","text","id","date","formControlName","createdAt",3,"readonly"],[1,"profile__button-wrapper"],["type","button","class","profile__button",3,"disabled","click",4,"ngIf"],["class","profile__form-error",4,"ngIf"],["mode","buffer"],["type","button",1,"profile__button",3,"disabled","click"],[1,"profile__form-error"]],template:function(s,n){1&s&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3,"User profile"),t.qZA(),t.TgZ(4,"button",3),t.NdJ("click",function(){return n.logOut()}),t.ALo(5,"async"),t.YNc(6,C,1,0,"mat-progress-bar",4),t.ALo(7,"async"),t.YNc(8,Z,2,0,"span",5),t.ALo(9,"async"),t.qZA()(),t.TgZ(10,"form",6)(11,"div",7)(12,"label",8),t._uU(13,"Name:"),t.qZA(),t._UZ(14,"input",9),t.qZA(),t.TgZ(15,"div",7)(16,"label",10),t._uU(17,"Email:"),t.qZA(),t._UZ(18,"input",11),t.qZA(),t.TgZ(19,"div",7)(20,"label",12),t._uU(21,"UID:"),t.qZA(),t._UZ(22,"input",13),t.qZA(),t.TgZ(23,"div",7)(24,"label",14),t._uU(25,"Created at:"),t.qZA(),t._UZ(26,"input",15),t.qZA(),t.TgZ(27,"div",16),t.YNc(28,y,6,9,"button",17)(29,A,6,9,"button",17)(30,U,6,9,"button",17),t.qZA(),t.YNc(31,M,2,1,"span",18),t.qZA()()),2&s&&(t.xp6(4),t.Q6J("disabled",t.lcZ(5,12,n.isLoading$)),t.xp6(2),t.Q6J("ngIf",t.lcZ(7,14,n.isLoading$)),t.xp6(2),t.Q6J("ngIf",!1===t.lcZ(9,16,n.isLoading$)),t.xp6(2),t.Q6J("formGroup",n.profileUser),t.xp6(4),t.Q6J("readonly",!n.isNameEditable),t.xp6(4),t.Q6J("readonly",!0),t.xp6(4),t.Q6J("readonly",!0),t.xp6(4),t.Q6J("readonly",!0),t.xp6(2),t.Q6J("ngIf",!n.isNameEditable),t.xp6(1),t.Q6J("ngIf",n.isNameEditable),t.xp6(1),t.Q6J("ngIf",n.isNameEditable),t.xp6(1),t.Q6J("ngIf",n.isShowNameError))},dependencies:[i.UX,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u,l.ez,l.O5,l.Ov,u.Cv,u.pW],styles:["[_nghost-%COMP%]{display:flex;justify-content:center;margin-top:5%;margin-bottom:5%;width:100%}.profile[_ngcontent-%COMP%]{width:80%;padding:32px;display:flex;flex-direction:column;align-items:center;background-color:#0b131b;border-radius:5px;color:#8d9398;box-shadow:2px 2px 4px #00000040}.profile__header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%}.profile__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;font-size:32px;color:#0a8f7b;text-transform:uppercase}.profile__form[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;align-items:center;margin-top:100px}.profile__form[_ngcontent-%COMP%]   .form__input-label[_ngcontent-%COMP%]{width:50%;min-width:250px;display:flex;align-items:center;border-top:solid 1px #113b3e;border-bottom:solid 1px #113b3e;margin:0}.profile__form[_ngcontent-%COMP%]   .form__input-label[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:25%;text-transform:uppercase}.profile__form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:40px;border:none;padding:10px;color:#fff;font-size:16px;background-color:#113b3e;margin:0}.profile__form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:read-only{background-color:#0b131b;color:#8d9398}.profile__form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none}.profile__form-error[_ngcontent-%COMP%]{font-size:16px;color:#f44336;font-weight:400;margin-top:15px;text-transform:uppercase}.profile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;height:40px;border:none;padding:10px;color:#fff;font-size:16px;border-radius:3px;background-color:#0a8f7b;cursor:pointer}.profile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{background-color:#8d9398;cursor:default}.profile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled:hover{background-color:#8d9398}.profile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0ea790;transition:.3s}.profile__button-wrapper[_ngcontent-%COMP%]{display:flex;width:50%;justify-content:space-between;align-items:center;padding-top:20px;gap:10px}.profile[_ngcontent-%COMP%]   .logout-button[_ngcontent-%COMP%]{width:15%;min-width:100px}"],changeDetection:0})}return o})(),canActivate:[_.p]}]}}]);