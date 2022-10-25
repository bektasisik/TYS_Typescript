/*const name = document.getElementById("name").value
const surname = document.getElementById("surname").value
const button = document.getElementById("addButton")
button.addEventListener("click", () => {
  const fullname = name + " " + surname;
alert("Talebe eklendi: " + fullname);
});*/

import { StudentService } from "./service/StudentService";
import { AttendanceService } from "./service/AttendanceService";

const studentUi = document.getElementById("studentUi");
const studentSection = document.getElementById("studentSection");


let sss = new StudentService();
let saaass = new AttendanceService();

