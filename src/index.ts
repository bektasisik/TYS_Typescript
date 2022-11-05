import { StudentService } from "./service/student_service";
import { AttendanceService } from "./service/attendance_service";
import { Student } from "./domain/student";

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

studentService.fetchStudents().then(() => {
    showLists();
});

var regName = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{3,20}$/;
var regSurname = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]{2,20}$/;
let selectedStudent: Student;
let selectedAttendanceId: number;


addStudentButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Ekleme");
    if (regName.test(nameInput.value) && regSurname.test(surnameInput.value)) {
        await studentService.addStudent(nameInput.value, surnameInput.value);
        showLists();
        alert(nameInput.value + " " + surnameInput.value + "\nÖğrenci Eklendi");
        nameInput.value = "";
        surnameInput.value = "";
    } else {
        alert("Talebe ADI ve SOYADI uygun formatta değil\n3-20 karakter arası sadece harf giriniz\nÖrnek: Bektaş Işık");
    }
});

updateStudentButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Güncelleme");
    if (regName.test(nameInput.value) && regSurname.test(surnameInput.value)) {
        await studentService.updateStudent(selectedStudent, nameInput.value, surnameInput.value);
        nameInput.value = "";
        surnameInput.value = "";
        addStudentButton.style.display = "block";
        updateStudentButton.style.display = "none";
        showLists();
        alert("Öğrenci Güncellendi");
    } else {
        alert("Talebe ADI ve SOYADI uygun formatta değil\n3-20 karakter arası sadece harf giriniz\nÖrnek: Bektaş Işık");
    }
});

takeAttendanceButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Yoklama alma");
    const map = new Map();
    studentService.getStudents().forEach((student: Student, index: number) => {
        map.set(student, selectList[index].value === "+");
    });
    if (!(selectPrayerTime.value === "")) {
        await attendanceService.takeAttendance(selectPrayerTime.value, map);
        showLists();
        alert(selectPrayerTime.value + " Yoklaması Alındı");
    } else {
        alert("Lütfen Vakti Seçiniz");
    }

});

updateAttendanceButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Yoklama güncelleme");
    const map = new Map();
    studentService.getStudents().forEach((student: Student, index: number) => {
        map.set(student, selectList[index].value === "+");
    })
    await attendanceService.updateAttendance(selectedAttendanceId, selectPrayerTime.value, map);
    console.log(attendanceService.getAttendanceList());
    takeAttendanceButton.style.display = "block";
    updateAttendanceButton.style.display = "none";
    showLists();
    alert(selectPrayerTime.value + "Yoklaması Güncellendi");
});

mySelectAttendanceId.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Yoklama Seçildi");
    listStudentsWithAttendanceId(Number(mySelectAttendanceId.value));
    alert("Seçilen Yoklamanın Öğrencileri Listelendi");
});

mySelectStudentId.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Talebe Seçildi");
    listAttendanceWithStudentId(Number(mySelectStudentId.value));
    alert("Seçilen Öğrencinin Yoklamaları Listelendi");
});


function showLists() {
    showStudentList();
    showAttendanceList();
    listAttendanceForStudents();
    listStudentsForAttendance();
    listAttendance();
}

async function showStudentList() {
    studentTable.innerHTML = "";
    studentService.getStudents().forEach((student: Student) => {
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

        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("Silme");
            await studentService.deleteStudent(Number(deleteButton.dataset.id));
            showLists();
            alert("Öğrenci Silindi");
        });
        updateButton.addEventListener("click", (e) => {
            e.preventDefault();
            selectedStudent = student;
            nameInput.value = selectedStudent.name;
            surnameInput.value = selectedStudent.surname;
            addStudentButton.style.display = "none";
            updateStudentButton.style.display = "block";
            updateStudentButton.setAttribute("data-id", selectedStudent.id.toString());
        });
    });
}
async function showAttendanceList() {
    takeAttendanceTable.innerHTML = "";
    studentService.getStudents().forEach((student: { id: { toString: () => string; }; name: string; surname: string; }) => {
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
async function listAttendance() {
    listAttendanceBody.innerHTML = "";
    attendanceService.getAttendanceList().forEach((attendance) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdDate = document.createElement("td");
        const tdPrayerTime = document.createElement("td");
        const tdDelete = document.createElement("td");
        const tdUpdate = document.createElement("td");
        const tdButton = document.createElement("td");
        const deleteButton = document.createElement("button");
        const updateButton = document.createElement("button");

        tdId.innerHTML = attendance.id.toString();
        tdDate.innerText = attendance.today;
        tdPrayerTime.innerText = attendance.prayerTime;
        deleteButton.setAttribute("class", "btn btn-danger");
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("data-id", attendance.id.toString());
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        updateButton.setAttribute("class", "btn btn-primary");
        updateButton.setAttribute("id", "updateButton");
        updateButton.setAttribute("data-id", attendance.id.toString());
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
            listAttendance();
            alert("Yoklama Silindi");
        });
        updateButton.addEventListener("click", (e) => {
            e.preventDefault();
            selectedAttendanceId = attendance.id;
            selectPrayerTime.value = attendance.prayerTime;
            updateAttendanceButton.style.display = "block";
            takeAttendanceButton.style.display = "none";
            updateAttendanceButton.setAttribute("data-id", selectedAttendanceId.toString());
        });
    });
}

/* Seçilen yoklama listesininin talebelerini gösterir. */
function listAttendanceForStudents() {
    const attendanceList = attendanceService.getAttendanceList();
    mySelectAttendanceId.innerHTML = "";
    attendanceList.forEach((attendance) => {
        const option = document.createElement("option");
        option.setAttribute("value", attendance.id.toString());
        option.innerText = attendance.today + " " + attendance.prayerTime;
        mySelectAttendanceId.appendChild(option);
    });

}


async function listStudentsWithAttendanceId(attendanceId: number) {
    console.log("Yokalmaya göre Talebe Listeleme");
    tbodyListForAttendance.innerHTML = "";
    const studentAttendanceFilter = await attendanceService.getAttendancesByAttendanceId(attendanceId);
    console.log(studentAttendanceFilter);
    studentAttendanceFilter.forEach((studentAttendance) => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdName = document.createElement("td");
        const tdSurname = document.createElement("td");
        const tdAbsent = document.createElement("td");

        tdId.innerHTML = studentAttendance.getStudent().id.toString();
        tdName.innerHTML = studentAttendance.getStudent().name;
        tdSurname.innerHTML = studentAttendance.getStudent().surname;
        tdAbsent.innerHTML = studentAttendance.getIsAbsenceToString();

        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSurname);
        tr.appendChild(tdAbsent);
        tbodyListForAttendance.appendChild(tr);
    });
}

/* Seçilen öğrencinin yoklama listesini gösterir. */
async function listStudentsForAttendance() {
    const studentList = studentService.getStudents();
    mySelectStudentId.innerHTML = "";
    studentList.forEach((student) => {
        const option = document.createElement("option");
        option.setAttribute("value", student.id.toString());
        option.innerText = student.name + " " + student.surname;
        mySelectStudentId.appendChild(option);
    });

}

async function listAttendanceWithStudentId(studentId: number) {
    console.log("Talebeye göre Yoklama Listeleme");
    tbodyListWithStudentId.innerHTML = "";
    const studentAttendanceFilter = await attendanceService.getAttendancesByStudentId(studentId);
    console.log(studentAttendanceFilter);
    studentAttendanceFilter.forEach((studentAttendance) => {
        const tr = document.createElement("tr");
        const tdToday = document.createElement("td");
        const tdPrayerTime = document.createElement("td");
        const tdAbsent = document.createElement("td");

        tdToday.innerHTML = studentAttendance.getAttendance().today;
        tdPrayerTime.innerHTML = studentAttendance.getAttendance().prayerTime;
        tdAbsent.innerHTML = studentAttendance.getIsAbsenceToString();

        tr.appendChild(tdToday);
        tr.appendChild(tdPrayerTime);
        tr.appendChild(tdAbsent);
        tbodyListWithStudentId.appendChild(tr);
    });
}