import { Student } from "../domain/student";
import { StudentService } from "../service/student_service";
import { AttendanceService } from "../service/attendance_service";
import { StudentAttendanceDTO } from "../dto/student_attendance_dto";

const studentService = new StudentService();
const attendanceService = new AttendanceService();
const takeAttendanceButton = document.getElementById("takeAttendanceButton") as HTMLButtonElement;
const updateAttendanceButton = document.getElementById("updateAttendanceButton") as HTMLButtonElement;
const selectPrayerTime = document.getElementById("selectPrayerTime") as HTMLInputElement;
const selectList = document.getElementsByName("selectAbsence") as NodeListOf<HTMLInputElement>;
const takeAttendanceTable = document.getElementById("takeAttendanceBody") as HTMLTableElement;
const listAttendanceBody = document.getElementById("listAttendanceBody") as HTMLTableElement;

let selectedAttendanceId: number;
export function attendanceCrud() {

    takeAttendanceButton.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Yoklama alma");
        let studentAttendanceDto = new Array<StudentAttendanceDTO>();
        (await studentService.getStudents()).forEach((student: Student, index: number) => {
            studentAttendanceDto.push(new StudentAttendanceDTO(student.getId(), selectList[index].checked));
        });
        try {
            await attendanceService.takeAttendance(selectPrayerTime.value, studentAttendanceDto).then(() => {
                takeAttendanceList();
                listAttendance();
                alert(selectPrayerTime.value + " Yoklaması Alındı");
            });
        } catch {
            alert("Lütfen Vakti Seçiniz");
        }
    });

    updateAttendanceButton.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Yoklama güncelleme");
        let studentAttendanceDto = new Array<StudentAttendanceDTO>();
        (await studentService.getStudents()).forEach((student: Student, index: number) => {
            studentAttendanceDto.push(new StudentAttendanceDTO(student.getId(), selectList[index].checked));
        })
        await attendanceService.updateAttendance(selectedAttendanceId, selectPrayerTime.value, studentAttendanceDto);
        takeAttendanceList();
        listAttendance();
        takeAttendanceButton.style.display = "block";
        updateAttendanceButton.style.display = "none";
        alert(selectPrayerTime.value + "Yoklaması Güncellendi");
    });


    async function takeAttendanceList() {
        takeAttendanceTable.innerHTML = "";
        (await studentService.getStudents()).forEach((student) => {
            const tr = document.createElement("tr");
            const tdId = document.createElement("td");
            const tdName = document.createElement("td");
            const tdSurname = document.createElement("td");
            const tdOption = document.createElement("td");
            const label = document.createElement("label");
            const input = document.createElement("input");
            const span = document.createElement("span");

            tdId.innerHTML = student.getId().toString();
            tdName.innerText = student.getName();
            tdSurname.innerText = student.getSurname();

            label.setAttribute("class", "switch");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", "checkbox");
            input.checked = true;
            input.setAttribute("name", "selectAbsence");
            input.setAttribute("data-id", student.getId().toString());
            span.setAttribute("class", "slider round");

            label.appendChild(input);
            label.appendChild(span);
            tdOption.appendChild(label);

            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdSurname);
            tr.appendChild(tdOption);
            takeAttendanceTable.appendChild(tr);
        });
    }

    async function listAttendance() {
        listAttendanceBody.innerHTML = "";
        (await attendanceService.getAttendances()).forEach((attendance) => {
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
                takeAttendanceList();
                listAttendance();
                alert("Yoklama Silindi");
            });
            updateButton.addEventListener("click", (e) => {
                e.preventDefault();
                selectedAttendanceId = attendance.getId();
                selectPrayerTime.value = attendance.getPrayerTime();
                updateButton.style.display = "none";
                deleteButton.style.display = "none";
                updateAttendanceButton.style.display = "block";
                takeAttendanceButton.style.display = "none";
                updateAttendanceButton.setAttribute("data-id", selectedAttendanceId.toString());
            });
        });
    }
}