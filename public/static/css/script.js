(()=>{"use strict";var t={332:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Student=void 0;var n=function(){function t(t,e,n){this.id=t,this.name=e,this.surname=n}return t.prototype.increaseAbsent=function(){this.absent=this.absent+1},t.prototype.setName=function(t){this.name=t},t.prototype.setSurname=function(t){this.surname=t},t.prototype.showInfoStudent=function(){console.log(this.name+" "+this.surname+" "+this.absent)},t}();e.Student=n},493:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StudentService=void 0;var u=n(332),s=function(){function t(){this.sequence=1}return t.prototype.addStudent=function(t,e){var n=new u.Student(this.sequence++,t,e);this.students.push(n)},t.prototype.getStudents=function(){return this.students},t.prototype.getStudent=function(t){return this.students.filter((function(e){return e.id===t}))[0]},t.prototype.updateStudent=function(t,e,n){var u=this.getStudent(t);u.setName(e),u.setSurname(n)},t.prototype.deleteStudent=function(t){this.students.splice(t)},t}();e.StudentService=s}},e={};(new(function n(u){var s=e[u];if(void 0!==s)return s.exports;var o=e[u]={exports:{}};return t[u](o,o.exports,n),o.exports}(493).StudentService)).getStudent(0)})();