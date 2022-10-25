import { StudentService } from "./service/StudentService";
import { AttendanceService } from "./service/AttendanceService";
import { debug } from "webpack";

const studentService = new StudentService();
const attendanceService = new AttendanceService();

addStudent();
/* function addStudent() {
  const name = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  studentService.addStudent(name.value, surname.value);
  addStudentList();
} */

function addStudent() {
  debugger;
  const name = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  addButton.addEventListener("click", () => {
    const fullname = name.value + " 123123 " + surname.value;
    studentService.addStudent(name.value, surname.value);
    debugger;
    console.log("Talebe eklendi: " + fullname);
    name.value = "";
    surname.value = "";
    debugger;
    console.log(studentService.getStudents());
    debugger;
    addStudentList();
  });
} 
function addStudentList() {
  const tbodyList = document.getElementById("studentListBody") as HTMLTableSectionElement;
  debugger;
  for (let index = 0; index < studentService.getStudents.length; index++) {
    debugger;
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdSurname = document.createElement("td");
    const tdAbsent = document.createElement("td");
    const tdButton = document.createElement("td");
    const deletebutton = document.createElement("button");
    const updatebutton = document.createElement("button");

    tdId.innerText = studentService.getStudents()[index].id.toString();
    tdName.innerText = studentService.getStudents()[index].name;
    tdSurname.innerText = studentService.getStudents()[index].surname;
    tdAbsent.innerText = studentService.getStudents()[index].absent.toString();
    deletebutton.innerText = "Sil";
    updatebutton.innerText = "Güncelle";
    deletebutton.addEventListener("click", () => {
      studentService.deleteStudent(index);
      console.log(studentService.getStudents());
      addStudentList();
    });
    updatebutton.addEventListener("click", () => {
      const name = document.getElementById("name") as HTMLInputElement;
      const surname = document.getElementById("surname") as HTMLInputElement;
      studentService.updateStudent(index, name.value, surname.value);
      console.log(studentService.getStudents());
      addStudentList();
    });
    
    
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdSurname);
    tr.appendChild(tdAbsent);
    tdButton.appendChild(deletebutton);
    tdButton.appendChild(updatebutton);
    tr.appendChild(tdButton);
    
    console.log(tr)
    tbodyList.appendChild(tr);
  }
}
function showStudents() {
  const studentList = document.getElementById("studentList") as HTMLUListElement;
  studentList.innerHTML = "";
  const students = studentService.getStudents();
  students.forEach((student) => {
    const li = document.createElement("li");
    li.innerText = student.name + " " + student.surname;
    studentList.appendChild(li);
  });
}
function deleteStudent(id: number) {
  studentService.deleteStudent(id);
  addStudentList();
}
function updateStudent(id: number) {
  const updateName = document.getElementById("name") as HTMLInputElement;
  const updateSurname = document.getElementById("surname") as HTMLInputElement;
  const updateButton = document.getElementById("addButton") as HTMLButtonElement;
  updateButton.innerText = "Güncelle";
  updateButton.addEventListener("click", () => {
    studentService.updateStudent(id, updateName.value, updateSurname.value);
    updateButton.innerText = "Ekle";
    addStudentList();
  });
}






