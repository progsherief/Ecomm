import './polyfills.server.mjs';
import{a as A}from"./chunk-GXVQVCZX.mjs";import"./chunk-B5YGRSSX.mjs";import{h as E}from"./chunk-AZJOESJL.mjs";import"./chunk-7PJ5ATBG.mjs";import{Ab as C,Hb as c,Ib as s,Jb as b,Ma as x,Ob as I,Pb as y,Qa as a,Ra as m,aa as f,fb as u,hb as g,mb as v,nb as S,ob as _,pb as h,qb as t,rb as r,sb as l}from"./chunk-25LRG7DY.mjs";import"./chunk-VVCT4QZE.mjs";var D=()=>[1,2,3,4,5];function T(e,i){e&1&&(t(0,"span"),l(1,"i",11),r())}function w(e,i){e&1&&l(0,"i",9)}function P(e,i){if(e&1&&(t(0,"section")(1,"div",0),l(2,"h1",1),t(3,"div",2),l(4,"img",3),r(),t(5,"div",4)(6,"h1",5),c(7),r(),t(8,"p",6),c(9),r(),t(10,"h3",7),c(11),r(),t(12,"div",8)(13,"span"),c(14),r(),t(15,"div"),_(16,T,2,0,"span",null,S),u(18,w,1,0,"i",9),t(19,"span",6),c(20),r()()(),t(21,"div")(22,"button",10),c(23,"Add To Cart"),r()()()()()),e&2){let n=C();a(4),g("src",n.product.imageCover,x)("alt",n.product.title),a(3),s(n.product.title),a(2),s(n.product.description),a(2),s(n.product.category.name),a(3),b("",n.product.price," EGP"),a(2),h(y(8,D).slice(0,n.product.ratingsAverage)),a(2),v(18,n.product.ratingsAverage%1!==0?18:-1),a(2),s(n.product.ratingsAverage)}}var R=(()=>{let i=class i{constructor(d,o){this._ActivatedRoute=d,this._ProductsService=o,this.product=null}ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:d=>{let o=d.get("id");this.productSub=this._ProductsService.getSpecificProduct(o).subscribe({next:p=>{this.product=p.data}})}})}ngOnDestroy(){this.productSub.unsubscribe()}};i.\u0275fac=function(o){return new(o||i)(m(E),m(A))},i.\u0275cmp=f({type:i,selectors:[["app-details"]],standalone:!0,features:[I],decls:1,vars:1,consts:[[1,"row","align-items-center"],[1,"text-center","text-main","my-2"],[1,"col-md-3"],[1,"w-100",3,"src","alt"],[1,"col-md-9"],[1,""],[1,"text-muted"],[1,"h6"],[1,"d-flex","justify-content-between","align-items-center"],[1,"fas","fa-star-half-alt","rating-color"],[1,"btn-main","w-100"],[1,"fas","fa-star","rating-color"]],template:function(o,p){o&1&&u(0,P,24,9,"section"),o&2&&v(0,p.product?0:-1)}});let e=i;return e})();export{R as DetailsComponent};
