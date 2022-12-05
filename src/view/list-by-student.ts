import { StudentService } from "../service/student_service";
import { StudentAttendanceService } from "../service/student_attendance_service";

const studentService = new StudentService();
const studentAttendanceservice = new StudentAttendanceService();
const mySelectStudentId = document.getElementById("mySelectStudentId") as HTMLInputElement;
const tbodyListWithStudentId = document.getElementById("tbodyListWithStudentId") as HTMLTableSectionElement;

export function listByStudent() {
    listStudentsForAttendance();

    mySelectStudentId.addEventListener("click", (e) => {
        e.preventDefault();
        if (!(mySelectStudentId.value === "")) {
            console.log("Talebe Seçildi");
            listAttendanceWithStudentId(Number(mySelectStudentId.value));
            alert("Seçilen Öğrencinin Yoklamaları Listelendi");
        }
        else {
            alert("Yoklama Listeniz Boş. Lütfen Yoklama Alınız...");
        }
    });

    /* Seçilen öğrencinin yoklama listesini gösterir. */
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
        console.log("Talebeye göre Yoklama Listeleme");
        tbodyListWithStudentId.innerHTML = "";
        const studentAttendanceFilter = await studentAttendanceservice.getAttendancesByStudentId(studentId);
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
}