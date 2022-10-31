import { StudentService } from "./service/student_service";
import { AttendanceService } from "./service/attendance_service";
import { Student } from "./domain/student";
import { Attendance } from "./domain/attendance";

const studentService = new StudentService();
const attendanceService = new AttendanceService();

const addStudentButton = document.getElementById("addStudentButton") as HTMLButtonElement;
const updateStudentButton = document.getElementById("updateStudentButton") as HTMLButtonElement;
const takeAttendanceButton = document.getElementById("takeAttendanceButton") as HTMLButtonElement;

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const surnameInput = document.getElementById("surnameInput") as HTMLInputElement;

const selectPrayerTime = document.getElementById("selectPrayerTime") as HTMLInputElement;
const selectList = document.getElementsByName("selectAbsence") as NodeListOf<HTMLSelectElement>;
const mySelectAttendanceId = document.getElementById("selectListWithAttendanceId") as HTMLTableSectionElement;
const mySelectStudentId = document.getElementById("mySelectStudentId") as HTMLTableSectionElement;

const studentTable = document.getElementById("studentListBody") as HTMLTableElement;
const takeAttendanceTable = document.getElementById("takeAttendanceBody") as HTMLTableElement;
const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;


let selectedStudent: Student;
showLists();

addStudentButton.addEventListener("click", (e) => {
    console.log("Ekleme");
    studentService.addStudent(nameInput.value, surnameInput.value);
    nameInput.value = "";
    surnameInput.value = "";
    showLists();
    e.preventDefault();
});

updateStudentButton.addEventListener("click", (e) => {
    studentService.updateStudent(selectedStudent.id, nameInput.value, surnameInput.value);
    nameInput.value = "";
    surnameInput.value = "";
    showLists();
    addStudentButton.style.display = "block";
    updateStudentButton.style.display = "none";
    e.preventDefault();
});

takeAttendanceButton.addEventListener("click", (e) => {
    const map = new Map();
    studentService.getStudents().forEach((student: Student, index: number) => {
        map.set(student, selectList[index].value === "+");
    })
    attendanceService.takeAttendance(selectPrayerTime.value, map);
    console.log(attendanceService.getAttendanceList());
    showLists();
    listWithAttendanceId();
    // listStudentsForAttendance();
    e.preventDefault();

});


function showLists() {
    showStudentList();
    showAttendanceList();
}

/**
 * Öğrenci listesini ekrana yazdırma (tabloda)
 */
function showStudentList() {
    studentTable.innerHTML = "";
    studentService.getStudents().forEach(student => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdSurname = document.createElement("td");
        const tdAbsent = document.createElement("td");
        const tdDelete = document.createElement("td");
        const tdUpdate = document.createElement("td");
        const tdButton = document.createElement("td");
        const deleteButton = document.createElement("button");
        const updateButton = document.createElement("button");

        tdId.innerHTML = student.id.toString();
        tdName.innerText = student.name;
        tdSurname.innerText = student.surname;
        tdAbsent.innerText = student.absent.toString();
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("data-id", student.id.toString());
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        updateButton.setAttribute("class", "btn btn-primary");
        updateButton.setAttribute("id", "updateButton");
        updateButton.setAttribute("data-id", student.id.toString());
        updateButton.innerHTML = '<i class="fa-solid fa-edit"></i>';
        tdDelete.appendChild(deleteButton);
        tdUpdate.appendChild(updateButton);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdAbsent);
        tdButton.appendChild(tdDelete);
        tdButton.appendChild(tdUpdate);
        tdButton.setAttribute("class", "d-flex justify-content-around");
        tr.appendChild(tdButton);
        studentTable.appendChild(tr);

        deleteButton.addEventListener("click", () => {
            studentService.deleteStudent(Number(deleteButton.dataset.id));
            showLists();
        });
        updateButton.addEventListener("click", () => {
            selectedStudent = student;
            nameInput.value = selectedStudent.name;
            surnameInput.value = selectedStudent.surname;
            addStudentButton.style.display = "none";
            updateStudentButton.style.display = "block";
            updateStudentButton.setAttribute("data-id", selectedStudent.id.toString());
        });
    });
}

function showAttendanceList() {
    takeAttendanceTable.innerHTML = "";
    studentService.getStudents().forEach(student => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdSurname = document.createElement("td");
        const tdOption = document.createElement("td");
        const select = document.createElement("select");
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        tdId.innerHTML = student.id.toString();
        tdName.innerText = student.name;
        tdSurname.innerText = student.surname;
        select.setAttribute("class", "form-select");
        select.setAttribute("name", "selectAbsence");
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
        takeAttendanceTable.appendChild(tr);
    });
}

function listWithAttendanceId() {
    const attendanceList = attendanceService.getAttendanceList();
    const selectListWithAttendanceId = document.getElementById("selectListWithAttendanceId") as HTMLTableSectionElement;
    selectListWithAttendanceId.innerHTML = "";
    const option = document.createElement("option");
    option.setAttribute("disabled", "disabled");
    option.innerText = "Lütfen Listelemek İstedğiniz Vakti Seçiniz...";
    selectListWithAttendanceId.appendChild(option);
    attendanceList.forEach((attendance) => {
        const option = document.createElement("option");
        option.setAttribute("value", attendance.id.toString());
        option.innerText = attendance.today + " " + attendance.prayerTime;
        selectListWithAttendanceId.appendChild(option);
    
    });
}