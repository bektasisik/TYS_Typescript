import { StudentService } from "./service/StudentService";
import { AttendanceService } from "./service/AttendanceService";

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
  const name = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  addButton.addEventListener("click", () => {
    const fullname = name.value + " " + surname.value;
    studentService.addStudent(name.value, surname.value);
    console.log("Talebe eklendi: " + fullname);
    name.value = "";
    surname.value = "";
    console.log(studentService.getStudents());
    addStudentList();
  });
}
function removeAllChildNodes(parent: HTMLDivElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function addStudentList() {
  console.log("addStudentList");
  const tbodyList = document.getElementById("studentListBody") as HTMLTableSectionElement;
  removeAllChildNodes(tbodyList);
  const students = studentService.getStudents();
  for (let index = 0; index < students.length; index++) {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdSurname = document.createElement("td");
    const tdAbsent = document.createElement("td");
    const tdButton = document.createElement("td");
    const deletebutton = document.createElement("button");
    const updatebutton = document.createElement("button");

    tdId.innerHTML = students[index].id.toString();
    tdName.innerText = students[index].name;
    tdSurname.innerText = students[index].surname;
    tdAbsent.innerText = students[index].absent.toString();
    deletebutton.innerHTML = '<button type="button" class="btn btn-danger">Sil</button>';
    updatebutton.innerHTML = '<button type="button" class="btn btn-warning">Güncelle</button>';

    deletebutton.addEventListener("click", () => {
      studentService.deleteStudent(students[index].id);
      alert("Silme işlemi gerçekleşti");
      alert(students[index].id);//indexi alıyoruz sil tusuna basınca ekrana yazdırıyoruz ama alt satırda galiba silme yapımıyor
      deleteStudent(students[index].id);
    });

    // deletebutton.addEventListener("click", () => {
    //   deleteStudent(students[index].id);
    //   studentService.deleteStudent(students[index].id);
    //   alert("Silme işlemi gerçekleşti");
    // });
    updatebutton.addEventListener("click", () => {
      const name = document.getElementById("name") as HTMLInputElement;
      const surname = document.getElementById("surname") as HTMLInputElement;
      const addButton = document.getElementById("addButton") as HTMLButtonElement;
      addButton.innerHTML = "Güncelle";
      name.value = students[index].name;
      surname.value = students[index].surname;
      addButton.addEventListener("click", () => {
        const fullname = name.value + " " + surname.value;
        studentService.updateStudent(students[index].id, name.value, surname.value);
        updateStudent(students[index].id);
        alert("Güncelleme işlemi gerçekleşti");

      });
    });

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdSurname);
    tr.appendChild(tdAbsent);
    tdButton.appendChild(deletebutton);
    tdButton.appendChild(updatebutton);
    tr.appendChild(tdButton);

    tbodyList.appendChild(tr);
  }
}
function deleteStudent(id: number) {
  const tbodyList = document.getElementById("studentListBody") as HTMLTableSectionElement;
  const tr = document.getElementById("tr") as HTMLTableRowElement;
  tbodyList.removeChild(tr);
  addStudentList();
}
function updateStudent(id: number) {
  const tbodyList = document.getElementById("studentListBody") as HTMLTableSectionElement;
  const tr = document.getElementById("tr") as HTMLTableRowElement;
  tbodyList.removeChild(tr);
  addStudentList();
}