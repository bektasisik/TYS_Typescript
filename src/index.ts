import { StudentService } from "./service/StudentService";
import { AttendanceService } from "./service/AttendanceService";

const studentService = new StudentService();
const attendanceService = new AttendanceService();


addStudent();

/**
 * Öğrenci ekleme
 */
function addStudent() {
  const name = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  const addButton = document.getElementById("addButton") as HTMLButtonElement;
  addButton.addEventListener("click", () => {
    const fullname = name.value + " " + surname.value;

    studentService.addStudent(name.value, surname.value);
    name.value = "";
    surname.value = "";
    console.log(studentService.getStudents());

    addStudentList();
    alert("Talebe eklendi: " + fullname);

  });
}

/**
 * Öğrenci listesini temizleme
 * @param element
 * @returns
 * @see https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
 * @param parent
 */
function removeAllChildNodes(parent: HTMLTableSectionElement) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

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
      alert("Silme işlemi gerçekleşti.");
      deleteStudent(students[index].id);
    });

    updatebutton.addEventListener("click", () => {
      const name = document.getElementById("name") as HTMLInputElement;
      const surname = document.getElementById("surname") as HTMLInputElement;
      const addButton = document.getElementById("addButton") as HTMLButtonElement;
      addButton.innerHTML = "Güncelle";
      name.value = students[index].name;
      surname.value = students[index].surname;
      addButton.addEventListener("click", () => {
        studentService.updateStudent(students[index].id, name.value, surname.value);
        alert("Güncelleme işlemi gerçekleşti");
        addStudentList();
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
  showStudentListForAttendance();
}
function deleteStudent(id: number) {
  studentService.deleteStudent(id);
  addStudentList();
}

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