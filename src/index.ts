import { Student } from "./domain/student";
import { Attendance } from "./domain/attendance";

import { StudentService } from "./service/student_service";
import { AttendanceService } from "./service/attendance_service";

import { StudentAttendanceDTO } from "./domain/student_attendance_dto";

const studentService = new StudentService();
const attendanceService = new AttendanceService();

const addStudentButton = document.getElementById("addStudentButton") as HTMLButtonElement;
const updateStudentButton = document.getElementById("updateStudentButton") as HTMLButtonElement;
const takeAttendanceButton = document.getElementById("takeAttendanceButton") as HTMLButtonElement;
const updateAttendanceButton = document.getElementById("updateAttendanceButton") as HTMLButtonElement;

const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const surnameInput = document.getElementById("surnameInput") as HTMLInputElement;

const selectPrayerTime = document.getElementById("selectPrayerTime") as HTMLInputElement;
const selectList = document.getElementsByName("selectAbsence") as NodeListOf<HTMLSelectElement>;
const mySelectAttendanceId = document.getElementById("selectListWithAttendanceId") as HTMLInputElement;
const mySelectStudentId = document.getElementById("mySelectStudentId") as HTMLInputElement;

const studentTable = document.getElementById("studentListBody") as HTMLTableElement;
const takeAttendanceTable = document.getElementById("takeAttendanceBody") as HTMLTableElement;
const listAttendanceBody = document.getElementById("listAttendanceBody") as HTMLTableElement;
const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;
const tbodyListWithStudentId = document.getElementById("tbodyListWithStudentId") as HTMLTableSectionElement;

showLists();
listAttendancesForStudents();
listStudentsForAttendance();

let selectedStudent: Student;
let selectedAttendanceId: number;


addStudentButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Ekleme");
    try {
        await studentService.addStudent(nameInput.value, surnameInput.value);
        showLists();
        alert(nameInput.value + " " + surnameInput.value + "\n????renci Eklendi");
        nameInput.value = "";
        surnameInput.value = "";
    } catch {
        alert("Talebe ADI ve SOYADI uygun formatta de??il\n3-20 karakter aras?? sadece harf giriniz\n??rnek: Bekta?? I????k");
    }
});

updateStudentButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("G??ncelleme");
    try {
        await studentService.updateStudent(selectedStudent, nameInput.value, surnameInput.value);
        nameInput.value = "";
        surnameInput.value = "";
        addStudentButton.style.display = "block";
        updateStudentButton.style.display = "none";
        showLists();
        alert("????renci G??ncellendi");
    } catch {
        alert("Talebe ADI ve SOYADI uygun formatta de??il\n3-20 karakter aras?? sadece harf giriniz\n??rnek: Bekta?? I????k");
    }
});

takeAttendanceButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Yoklama alma");
    let studentAttendanceDto = new Array<StudentAttendanceDTO>();
    (await studentService.getStudents()).forEach((student: Student, index: number) => {
        studentAttendanceDto.push(new StudentAttendanceDTO(student.getId(), selectList[index].value === "+"));
    });
    try {
        await attendanceService.takeAttendance(selectPrayerTime.value, studentAttendanceDto).then(() => {
            showLists();
            listAttendancesForStudents();
            listStudentsForAttendance();
            alert(selectPrayerTime.value + " Yoklamas?? Al??nd??");
        });
    } catch {
        alert("L??tfen Vakti Se??iniz");
    }
});

updateAttendanceButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Yoklama g??ncelleme");
    let studentAttendanceDto = new Array<StudentAttendanceDTO>();
    (await studentService.getStudents()).forEach((student: Student, index: number) => {
        studentAttendanceDto.push(new StudentAttendanceDTO(student.getId(), selectList[index].value === "+"));
    })
    await attendanceService.updateAttendance(selectedAttendanceId, selectPrayerTime.value, studentAttendanceDto);
    showLists();
    listAttendancesForStudents();
    listStudentsForAttendance();
    takeAttendanceButton.style.display = "block";
    updateAttendanceButton.style.display = "none";
    alert(selectPrayerTime.value + "Yoklamas?? G??ncellendi");
});

mySelectAttendanceId.addEventListener("click", (e) => {
    e.preventDefault();
    if (!(mySelectAttendanceId.value === "")) {
        console.log("Yoklama Se??ildi");
        listStudentsWithAttendanceId(Number(mySelectAttendanceId.value));
        listAttendancesForStudents();
        alert("Se??ilen Yoklaman??n ????rencileri Listelendi");
    }
    else {
        alert("Yoklama Listeniz Bo??. L??tfen Yoklama Al??n??z...");
    }
});

mySelectStudentId.addEventListener("click", (e) => {
    e.preventDefault();
    if (!(mySelectStudentId.value === "")) {
        console.log("Talebe Se??ildi");
        listAttendanceWithStudentId(Number(mySelectStudentId.value));
        listStudentsForAttendance();
        alert("Se??ilen ????rencinin Yoklamalar?? Listelendi");
    }
    else {
        alert("Yoklama Listeniz Bo??. L??tfen Yoklama Al??n??z...");
    }
});

function showLists() {
    showStudentList();
    takeAttendanceList();
    listAttendance();
}

async function showStudentList() {
    studentTable.innerHTML = "";
    (await studentService.getStudents()).forEach((student: Student) => {
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

        tdId.innerHTML = student.getId().toString();
        tdName.innerText = student.getName();
        tdSurname.innerText = student.getSurname();
        tdAbsent.innerText = student.getAbsent().toString();
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("data-id", student.getId().toString());
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        updateButton.setAttribute("class", "btn btn-primary");
        updateButton.setAttribute("id", "updateButton");
        updateButton.setAttribute("data-id", student.getId().toString());
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

        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Silme");
            await studentService.deleteStudent(Number(deleteButton.dataset.id));
            showLists();
            alert("????renci Silindi");
        });
        updateButton.addEventListener("click", (e) => {
            e.preventDefault();
            selectedStudent = student;
            nameInput.value = selectedStudent.getName();
            surnameInput.value = selectedStudent.getSurname();
            deleteButton.style.display = "none";
            addStudentButton.style.display = "none";
            updateStudentButton.style.display = "block";
            updateStudentButton.setAttribute("data-id", selectedStudent.getId().toString());
        });
    });
}

async function takeAttendanceList() {
    takeAttendanceTable.innerHTML = "";
    (await studentService.getStudents()).forEach((student: Student) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdSurname = document.createElement("td");
        const tdOption = document.createElement("td");
        const select = document.createElement("select");
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        tdId.innerHTML = student.getId().toString();
        tdName.innerText = student.getName();
        tdSurname.innerText = student.getSurname();
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

async function listAttendance() {
    listAttendanceBody.innerHTML = "";

    (await attendanceService.getAttendances()).forEach((attendance: Attendance) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdPrayerTime = document.createElement("td");
        const tdDelete = document.createElement("td");
        const tdUpdate = document.createElement("td");
        const tdButton = document.createElement("td");
        const deleteButton = document.createElement("button");
        const updateButton = document.createElement("button");

        tdId.innerHTML = attendance.getId().toString();
        tdDate.innerText = attendance.getToday();
        tdPrayerTime.innerText = attendance.getPrayerTime();
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("data-id", attendance.getId().toString());
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        updateButton.setAttribute("class", "btn btn-primary");
        updateButton.setAttribute("id", "updateButton");
        updateButton.setAttribute("data-id", attendance.getId().toString());
        updateButton.innerHTML = '<i class="fa-solid fa-edit"></i>';
        tdDelete.appendChild(deleteButton);
        tdUpdate.appendChild(updateButton);
        tr.appendChild(tdId);
        tr.appendChild(tdDate);
        tr.appendChild(tdPrayerTime);
        tdButton.appendChild(tdDelete);
        tdButton.appendChild(tdUpdate);
        tdButton.setAttribute("class", "d-flex justify-content-around");
        tr.appendChild(tdButton);
        listAttendanceBody.appendChild(tr);

        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Silme");
            await attendanceService.deleteAttendance(Number(deleteButton.dataset.id));
            showLists();
            listAttendancesForStudents();
            listStudentsForAttendance();
            alert("Yoklama Silindi");
        });
        updateButton.addEventListener("click", (e) => {
            e.preventDefault();
            selectedAttendanceId = attendance.getId();
            selectPrayerTime.value = attendance.getPrayerTime();
            deleteButton.style.display = "none";
            updateAttendanceButton.style.display = "block";
            takeAttendanceButton.style.display = "none";
            updateAttendanceButton.setAttribute("data-id", selectedAttendanceId.toString());
        });
    });
}

/* Se??ilen yoklama listesininin talebelerini g??sterir. */
async function listAttendancesForStudents() {
    mySelectAttendanceId.innerHTML = "";
    const attendanceList = await attendanceService.getAttendances();
    (await attendanceList).forEach((attendance) => {
        const option = document.createElement("option");
        option.setAttribute("value", attendance.getId().toString());
        option.innerText = attendance.getToday() + " " + attendance.getPrayerTime();
        mySelectAttendanceId.appendChild(option);
    });

}

async function listStudentsWithAttendanceId(attendanceId: number) {
    console.log("Yokalmaya g??re Talebe Listeleme");
    tbodyListForAttendance.innerHTML = "";
    const studentAttendanceFilter = await attendanceService.getAttendancesByAttendanceId(attendanceId);
    console.log(studentAttendanceFilter);
    studentAttendanceFilter.forEach((studentAttendance) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdSurname = document.createElement("td");
        const tdAbsent = document.createElement("td");

        tdId.innerHTML = studentAttendance.getStudent().getId().toString();
        tdName.innerHTML = studentAttendance.getStudent().getName();
        tdSurname.innerHTML = studentAttendance.getStudent().getSurname();
        tdAbsent.innerHTML = studentAttendance.getIsAbsenceToString();

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdAbsent);
        tbodyListForAttendance.appendChild(tr);
    });
}

/* Se??ilen ????rencinin yoklama listesini g??sterir. */
async function listStudentsForAttendance() {
    const studentList = await studentService.getStudents();
    mySelectStudentId.innerHTML = "";
    studentList.forEach((student) => {
        const option = document.createElement("option");
        option.setAttribute("value", student.getId().toString());
        option.innerText = student.getName() + " " + student.getSurname();
        mySelectStudentId.appendChild(option);
    });

}

async function listAttendanceWithStudentId(studentId: number) {
    console.log("Talebeye g??re Yoklama Listeleme");
    tbodyListWithStudentId.innerHTML = "";
    const studentAttendanceFilter = await attendanceService.getAttendancesByStudentId(studentId);
    console.log(studentAttendanceFilter);
    studentAttendanceFilter.forEach((studentAttendance) => {
        const tr = document.createElement("tr");
        const tdToday = document.createElement("td");
        const tdPrayerTime = document.createElement("td");
        const tdAbsent = document.createElement("td");

        tdToday.innerHTML = studentAttendance.getAttendance().getToday();
        tdPrayerTime.innerHTML = studentAttendance.getAttendance().getPrayerTime();
        tdAbsent.innerHTML = studentAttendance.getIsAbsenceToString();

        tr.appendChild(tdToday);
        tr.appendChild(tdPrayerTime);
        tr.appendChild(tdAbsent);
        tbodyListWithStudentId.appendChild(tr);
    });
}