import './polyfills.server.mjs';
import{a}from"./chunk-B5YGRSSX.mjs";import{k as u}from"./chunk-AZJOESJL.mjs";import{x as p}from"./chunk-7PJ5ATBG.mjs";import{S as l,Y as c}from"./chunk-25LRG7DY.mjs";var s=class extends Error{};s.prototype.name="InvalidTokenError";function h(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,o)=>{let e=o.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e}))}function f(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return h(t)}catch{return atob(t)}}function d(r,t){if(typeof r!="string")throw new s("Invalid token specified: must be a string");t||(t={});let o=t.header===!0?0:1,e=r.split(".")[o];if(typeof e!="string")throw new s(`Invalid token specified: missing part #${o+1}`);let i;try{i=f(e)}catch(n){throw new s(`Invalid token specified: invalid base64 for part #${o+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new s(`Invalid token specified: invalid json for part #${o+1} (${n.message})`)}}var $=(()=>{let t=class t{constructor(){this.userData=null,this._Httpclient=c(p),this._Router=c(u)}setRegisterForm(e){return this._Httpclient.post(`${a.baseurl}/api/v1/auth/signup`,e)}setLoginForm(e){return this._Httpclient.post(`${a.baseurl}/api/v1/auth/signin`,e)}saveUserData(){localStorage.getItem("userToken")!==null&&(this.userData=d(localStorage.getItem("userToken")),console.log(this.userData))}ForgotPassword(e){return this._Httpclient.post(`${a.baseurl}/api/v1/auth/forgotPasswords`,e)}VerifyResetCode(e){return this._Httpclient.post(`${a.baseurl}/api/v1/auth/verifyResetCode`,e)}ResetPassword(e){return this._Httpclient.put(`${a.baseurl}/api/v1/auth/resetPassword`,e)}logOut(){localStorage.removeItem("userToken"),this.userData=null,this._Router.navigate(["/login"])}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{$ as a};
