import { AttendanceService } from "../service/attendance_service";
import { StudentAttendanceService } from "../service/student_attendance_service";

const attendanceService = new AttendanceService();
const studentAttendanceservice = new StudentAttendanceService();
const mySelectAttendanceId = document.getElementById("selectListWithAttendanceId") as HTMLInputElement;
const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;

export function listByAttendance() {
    listAttendancesForStudents();

    mySelectAttendanceId.addEventListener("click", (e) => {
        e.preventDefault();
        if (!(mySelectAttendanceId.value === "")) {
            console.log("Yoklama Seçildi");
            listStudentsWithAttendanceId(Number(mySelectAttendanceId.value));
            alert("Seçilen Yoklamanın Öğrencileri Listelendi");
        }
        else {
            alert("Yoklama Listeniz Boş. Lütfen Yoklama Alınız...");
        }
    });

    /* Seçilen yoklama listesininin talebelerini gösterir. */
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
        console.log("Yokalmaya göre Talebe Listeleme");
        tbodyListForAttendance.innerHTML = "";
        const studentAttendanceFilter = await studentAttendanceservice.getStudentsByAttendanceId(attendanceId);
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
}