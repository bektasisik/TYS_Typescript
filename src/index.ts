import { StudentService } from "./service/StudentService";
import { AttendanceService } from "./service/AttendanceService";
import { Student } from "./domain/Student";


const studentService = new StudentService();
const attendanceService = new AttendanceService();

// Student Service
addStudent();
/**
 * Öğrenci ekleme
 * @see https://www.w3schools.com/jsref/met_document_getelementbyid.asp
 */
function addStudent() {
  const name = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    studentService.addStudent(name.value, surname.value);
    name.value = "";
    surname.value = "";
    debugger;
    console.log(studentService.getStudents());

    addStudentList();
  });
}
/**
 * Öğrenci listesini temizleme
 * @param parent
 * @see https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
 */
function removeAllChildNodes(parent: HTMLTableSectionElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Öğrenci listesini ekrana yazdırma (tabloda)
 * @see https://www.w3schools.com/jsref/met_document_createelement.asp
 * @see https://www.w3schools.com/jsref/met_node_appendchild.asp
*/
function addStudentList() {
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
      addStudentList();
    });
    // updatebutton.addEventListener("click", () => {
    //   const name = document.getElementById("name") as HTMLInputElement;
    //   const surname = document.getElementById("surname") as HTMLInputElement;
    //   const addButton = document.getElementById("addButton") as HTMLButtonElement;
    //   const updateButton = document.getElementById("updateButton") as HTMLButtonElement;
    //   name.value = students[index].name;
    //   surname.value = students[index].surname;
    //   addButton.style.display = "none";
    //   updateButton.style.display = "block";
    //   updateButton.addEventListener("click", () => {
    //     updateStudent(students[index].id, name.value, surname.value);
    //     name.value = "";
    //     surname.value = "";
    //     addButton.style.display = "block";
    //     updateButton.style.display = "none";

    //   });
    // });
    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdSurname);
    tr.appendChild(tdAbsent);
    tdButton.appendChild(deletebutton);
    tdButton.appendChild(updatebutton);
    tr.appendChild(tdButton);

    tbodyList.appendChild(tr);
  }
  showStudentListForAttendance();
}
// function updateStudent(id: number, name: string, surname: string) {
//   studentService.updateStudent(id, name, surname);
//   addStudentList();
// }

/**
 * Attendance Service
 */

/**
 * Seçilen öğrencileri yoklama listesine ekleme
 */
function showStudentListForAttendance() {
  const tbodyListForAttendance = document.getElementById("takeAttendanceBody") as HTMLTableSectionElement;
  removeAllChildNodes(tbodyListForAttendance);
  const students = studentService.getStudents();
  for (let index = 0; index < students.length; index++) {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdSurname = document.createElement("td");
    const tdOption = document.createElement("td");
    const select = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    tdId.innerHTML = students[index].id.toString();
    tdName.innerText = students[index].name;
    tdSurname.innerText = students[index].surname;
    select.setAttribute("class", "form-select");
    select.setAttribute("aria-label", "select example");
    option1.setAttribute("value", "+");
    option2.setAttribute("value", "-");
    option1.innerText = "+";
    option2.innerText = "-";
    select.appendChild(option1);
    select.appendChild(option2);
    tdOption.appendChild(select);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdSurname);
    tr.appendChild(tdOption);

    tbodyListForAttendance.appendChild(tr);
  }
}
const takeAttendanceButton = document.getElementById("takeAttendanceButton") as HTMLButtonElement;
takeAttendanceButton.addEventListener("click", () => {
  const selectList = document.getElementsByTagName("select");
  const students = studentService.getStudents();
  for (let index = 0; index < students.length; index++) {
    if (selectList[index].value === "+") {
      studentService.takeAttendance(students[index].id, true);
    } else {
      studentService.takeAttendance(students[index].id, false);
    }
  }
  console.log(attendanceService.getAttendanceList());
  addStudentList();
});

/**
 * Yoklama alma (tablodan) 
 * @see https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp
 * @see https://www.w3schools.com/jsref/prop_select_value.asp
 * @see https://www.w3schools.com/jsref/prop_select_selectedindex.asp
 */
function takeAttendance() {
  const students = studentService.getStudents() as Student[];
  const selectPraterTime = document.getElementById("selectPrayerTime");

  const tbodyListForAttendance = document.getElementById("takeAttendanceBody") as HTMLTableSectionElement;
  const trs = tbodyListForAttendance.getElementsByTagName("tr");

  for (let index = 0; index < trs.length; index++) {
    const tds = trs[index].getElementsByTagName("td");
    const select = tds[3].getElementsByTagName("select")[0];
    const value = select.value;
    const id = parseInt(tds[0].innerHTML);
    const student = students.find((student) => student.id === id);
    if (student) {
      if (value === "-") {
        student.absent++;
      }
    }
  }
  showStudentListForAttendance();
  addStudentList();
}