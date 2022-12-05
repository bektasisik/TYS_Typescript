import { Student } from "../domain/student";
import { StudentService } from "../service/student_service";

const studentService = new StudentService();
const addStudentButton = document.getElementById("addStudentButton") as HTMLButtonElement;
const updateStudentButton = document.getElementById("updateStudentButton") as HTMLButtonElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const surnameInput = document.getElementById("surnameInput") as HTMLInputElement;
const studentTable = document.getElementById("studentListBody") as HTMLTableElement;

let selectedStudent: Student;

export function studentCrud() {
    showStudentList();

    addStudentButton.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Ekleme");
        try {
            await studentService.addStudent(nameInput.value, surnameInput.value);
            showStudentList();
            alert(nameInput.value + " " + surnameInput.value + "\nÖğrenci Eklendi");
            nameInput.value = "";
            surnameInput.value = "";
        } catch {
            alert("Talebe ADI ve SOYADI uygun formatta değil\n3-20 karakter arası sadece harf giriniz\nÖrnek: Bektaş Işık");
        }
    });

    updateStudentButton.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("Güncelleme");
        try {
            await studentService.updateStudent(selectedStudent, nameInput.value, surnameInput.value);
            nameInput.value = "";
            surnameInput.value = "";
            addStudentButton.style.display = "block";
            updateStudentButton.style.display = "none";
            showStudentList();
            alert("Öğrenci Güncellendi");
        } catch {
            alert("Talebe ADI ve SOYADI uygun formatta değil\n3-20 karakter arası sadece harf giriniz\nÖrnek: Bektaş Işık");
        }
    });
    
    async function showStudentList() {
        studentTable.innerHTML = "";
        (await studentService.getStudents()).forEach((student) => {
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
                showStudentList();
                alert("Öğrenci Silindi");
            });
            updateButton.addEventListener("click", (e) => {
                e.preventDefault();
                selectedStudent = student;
                nameInput.value = selectedStudent.getName();
                surnameInput.value = selectedStudent.getSurname();
                updateButton.style.display = "none";
                deleteButton.style.display = "none";
                updateStudentButton.style.display = "block";
                addStudentButton.style.display = "none";
                updateStudentButton.setAttribute("data-id", selectedStudent.getId().toString());
            });
        });
    }
}