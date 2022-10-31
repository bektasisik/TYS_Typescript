// function showStudentListForAttendance1() {
//   const table = document.getElementById("takeAttendanceBody") as HTMLTableElement;
//   table.innerHTML = "";

//   const students = studentService.getStudents();
//   students.forEach(student => {
//     const tr = document.createElement("tr");
//     const tdId = document.createElement("td");
//     const tdName = document.createElement("td");
//     const tdSurname = document.createElement("td");
//     const tdOption = document.createElement("td");
//     const select = document.createElement("select");
//     const option1 = document.createElement("option");
//     const option2 = document.createElement("option");


//     tdId.innerHTML = student.id.toString();
//     tdName.innerText = student.name;
//     tdSurname.innerText = student.surname;
//     select.setAttribute("class", "form-select");
//     select.setAttribute("aria-label", "select example");
//     option1.setAttribute("value", "+");
//     option2.setAttribute("value", "-");
//     option1.innerText = "+";
//     option2.innerText = "-";

//     select.appendChild(option1);
//     select.appendChild(option2);
//     tdOption.appendChild(select);
//     tr.appendChild(tdId);
//     tr.appendChild(tdName);
//     tr.appendChild(tdSurname);
//     tr.appendChild(tdOption);
//     table.appendChild(tr);
//     });
// }

//   /**
//    * Attendance Service
//    */
//   /**
//    * Seçilen öğrencileri yoklama listesine ekleme
//    */
//     // for (let index = 0; index < students.length; index++) {
//     //   const tr = document.createElement("tr");
//     //   const tdId = document.createElement("td");
//     //   const tdName = document.createElement("td");
//     //   const tdSurname = document.createElement("td");
//     //   const tdOption = document.createElement("td");
//     //   const select = document.createElement("select");
//     //   const option1 = document.createElement("option");
//     //   const option2 = document.createElement("option");

//     //   tdId.innerHTML = students[index].id.toString();
//     //   tdName.innerText = students[index].name;
//     //   tdSurname.innerText = students[index].surname;
//     //   select.setAttribute("class", "form-select");
//     //   select.setAttribute("aria-label", "select example");
//     //   option1.setAttribute("value", "+");
//     //   option2.setAttribute("value", "-");
//     //   option1.innerText = "+";
//     //   option2.innerText = "-";
//     //   select.appendChild(option1);
//     //   select.appendChild(option2);
//     //   tdOption.appendChild(select);

//     //   tr.appendChild(tdId);
//     //   tr.appendChild(tdName);
//     //   tr.appendChild(tdSurname);
//     //   tr.appendChild(tdOption);

//     //   tbodyListForAttendance.appendChild(tr);


// for (let index = 0; index < students.length; index++) {
//   const tr = document.createElement("tr");
//   const tdId = document.createElement("td");
//   const tdName = document.createElement("td");
//   const tdSurname = document.createElement("td");
//   const tdAbsent = document.createElement("td");
//   const tdButton = document.createElement("td");
//   const deletebutton = document.createElement("button");
//   const updateButtonStudent = document.createElement("button");

//   tdId.innerText = students[index].id.toString();
//   tdName.innerText = students[index].name;
//   tdSurname.innerText = students[index].surname;
//   tdAbsent.innerText = students[index].absent.toString();
//   deletebutton.innerHTML = '<button type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>';
//   updateButtonStudent.innerHTML = '<button type="button" class="btn btn-warning"><i class="fa-solid fa-user-pen"></i></button>';


//   deletebutton.addEventListener("click", () => {
//     studentService.deleteStudent(students[index].id);
//     addStudentList();
//   });

//   updateButtonStudent.addEventListener("click", () => {

//     selectedStudent = students[index];
//     nameInput.value = selectedStudent.name;
//     surnameInput.value = selectedStudent.surname;
//     addButton.style.display = "none";
//     updateButton.style.display = "block";
//   });

//   tr.appendChild(tdId);
//   tr.appendChild(tdName);
//   tr.appendChild(tdSurname);
//   tr.appendChild(tdAbsent);
//   tdButton.appendChild(deletebutton);
//   tdButton.appendChild(updateButtonStudent);
//   tr.appendChild(tdButton);

//   tbodyList.appendChild(tr);
// }

// updateButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   studentService.updateStudent(selectedStudent.id, nameInput.value, surnameInput.value);
//   nameInput.value = "";
//   surnameInput.value = "";
//   addButton.style.display = "block";
//   updateButton.style.display = "none";
// });

// addStudent();

// function addStudent(){
//   const name = document.getElementById("name") as HTMLInputElement;
//   const surname = document.getElementById("surname") as HTMLInputElement;
//   const addButton = document.getElementById("addButton") as HTMLButtonElement;
//   addButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     studentService.addStudent(name.value, surname.value);
//     showStudents();
//     name.value = "";
//     surname.value = "";
//   });
// }

// function showStudents(){
//   const students = studentService.getStudents();
//   let selectedStudent: Student;
//   const table = document.getElementById("studentListBody") as HTMLTableElement;
//   table.innerHTML = "";
//   students.forEach(student => {
//     const row = table.insertRow();
//     const cellId = row.insertCell(0);
//     const cellName = row.insertCell(1);
//     const cellSurname = row.insertCell(2);
//     const cellAbsent = row.insertCell(3);
//     const cellDelete = row.insertCell(4);
//     const cellUpdate = row.insertCell(5);
//     cellId.innerHTML = student.id.toString();
//     cellName.innerHTML = student.name;
//     cellSurname.innerHTML = student.surname;
//     cellAbsent.innerHTML = student.absent.toString();
//     cellDelete.innerHTML = `<button id="deleteButton" data-id="${student.id}">Delete</button>`;
//     cellUpdate.innerHTML = `<button id="updateButton1" data-id="${student.id}">Update</button>`;
//     const updateButton = document.getElementById("updateButton1") as HTMLButtonElement;
//     updateButton.addEventListener("click", () => {
//     const id = updateButton.dataset.id;
//     const name = document.getElementById("name") as HTMLInputElement;
//     const surname = document.getElementById("surname") as HTMLInputElement;
//     studentService.updateStudent(Number(id), name.value, surname.value);
//     selectedStudent.name = name.value;
//     selectedStudent.surname = surname.value;

//     showStudents();
//   });
//     deleteStudent();

//     showAttendance();
//   });

// }
// function updateButtonStudent(){
//   const updateButton = document.getElementById("updateButton") as HTMLButtonElement;
//   updateButton.addEventListener("click", () => {
//     const id = updateButton.dataset.id;
//     const name = document.getElementById("name") as HTMLInputElement;
//     const surname = document.getElementById("surname") as HTMLInputElement;
//     studentService.updateStudent(Number(id), name.value, surname.value);
//     showStudents();
//   });
// }


// function updateStudent(){
//   const updateButton = document.getElementById("updateButton1") as HTMLButtonElement;
//   updateButton.addEventListener("click", () => {
//     const id = updateButton.dataset.id;
//     const name = document.getElementById("name") as HTMLInputElement;
//     const surname = document.getElementById("surname") as HTMLInputElement;
//     studentService.updateStudent(Number(id), name.value, surname.value);
//     showStudents();
//   });
// }

// function deleteStudent(){
//   const deleteButton = document.getElementById("deleteButton") as HTMLButtonElement;
//   deleteButton.addEventListener("click", () => {
//     const id = deleteButton.dataset.id;
//     studentService.deleteStudent(Number(id));
//     showStudents();
//   });
// }

// function showAttendance(){
//   const tbodyListForAttendance = document.getElementById("takeAttendanceBody") as HTMLTableSectionElement;
//   const students = studentService.getStudents();
//   const table = document.getElementById("takeAttendanceBody") as HTMLTableElement;
//   table.innerHTML = "";
//   students.forEach(student => {
//     const tr = document.createElement("tr");
//     const tdId = document.createElement("td");
//     const tdName = document.createElement("td");
//     const tdSurname = document.createElement("td");
//     const tdOption = document.createElement("td");
//     const select = document.createElement("select");
//     const option1 = document.createElement("option");
//     const option2 = document.createElement("option");

//     tdId.innerHTML = student.id.toString();
//     tdName.innerText = student.name;
//     tdSurname.innerText = student.surname;
//     select.setAttribute("class", "form-select");
//     select.setAttribute("aria-label", "select example");
//     option1.setAttribute("value", "+");
//     option2.setAttribute("value", "-");
//     option1.innerText = "+";
//     option2.innerText = "-";
//     select.appendChild(option1);
//     select.appendChild(option2);
//     tdOption.appendChild(select);

//     tr.appendChild(tdId);
//     tr.appendChild(tdName);
//     tr.appendChild(tdSurname);
//     tr.appendChild(tdOption);

//     tbodyListForAttendance.appendChild(tr);
//   }
//   );
// }

// showStudents();
// showAttendance();


// Student Service



// const selectListWithAttendanceId = document.getElementById("selectListWithAttendanceId") as HTMLSelectElement;
// selectListWithAttendanceId.addEventListener("change", () => {
//   const selectListWithAttendanceIdValue = selectListWithAttendanceId.value;
//   const attendanceList = attendanceService.getAttendanceList();
//   const attendance = attendanceList.find((attendance) => attendance.id === parseInt(selectListWithAttendanceIdValue));
//   if (attendance) {
//     const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;
//     tbodyListForAttendance.innerHTML = "";
//     attendance.attendanceList.forEach((student: { id: { toString: () => string; }; name: string; surname: string; absent: { toString: () => string; }; }) => {
//       const tr = document.createElement("tr");
//       const tdId = document.createElement("td");
//       const tdName = document.createElement("td");
//       const tdSurname = document.createElement("td");
//       const tdAbsent = document.createElement("td");
//       const tdOption = document.createElement("td");
//       const select = document.createElement("select");
//       select.setAttribute("class", "form-select");
//       const optionPlus = document.createElement("option");
//       optionPlus.setAttribute("value", "+");
//       optionPlus.innerText = "+";
//       const optionMinus = document.createElement("option");
//       optionMinus.setAttribute("value", "-");
//       optionMinus.innerText = "-";
//       select.appendChild(optionPlus);
//       select.appendChild(optionMinus);
//       tdId.innerText = student.id.toString();
//       tdName.innerText = student.name;
//       tdSurname.innerText = student.surname;
//       tdAbsent.innerText = student.absent.toString();
//       tdOption.appendChild(select);
//       tr.appendChild(tdId);
//       tr.appendChild(tdName);
//       tr.appendChild(tdSurname);
//       tr.appendChild(tdAbsent);
//       tr.appendChild(tdOption);
//       tbodyListForAttendance.appendChild(tr);
//     });
//   }
// });


// const selectListWithStudentId = document.getElementById("selectListWithStudentId") as HTMLSelectElement;
// selectListWithStudentId.addEventListener("change", () => {
//   const selectListWithStudentIdValue = selectListWithStudentId.value;
//   const students = studentService.getStudents();
//   const student = students.find((student) => student.id === parseInt(selectListWithStudentIdValue));
//   if (student) {
//     const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;
//     tbodyListForAttendance.innerHTML = "";
//     const tr = document.createElement("tr");
//     const tdId = document.createElement("td");
//     const tdName = document.createElement("td");
//     const tdSurname = document.createElement("td");
//     const tdAbsent = document.createElement("td");
//     const tdOption = document.createElement("td");
//     const select = document.createElement("select");
//     select.setAttribute("class", "form-select");
//     const optionPlus = document.createElement("option");
//     optionPlus.setAttribute("value", "+");
//     optionPlus.innerText = "+";
//     const optionMinus = document.createElement("option");
//     optionMinus.setAttribute("value", "-");
//     optionMinus.innerText = "-";
//     select.appendChild(optionPlus);
//     select.appendChild(optionMinus);
//     tdId.innerText = student.id.toString();
//     tdName.innerText = student.name;
//     tdSurname.innerText = student.surname;
//     tdAbsent.innerText = student.absent.toString();
//     tdOption.appendChild(select);
//     tr.appendChild(tdId);
//     tr.appendChild(tdName);
//     tr.appendChild(tdSurname);
//     tr.appendChild(tdAbsent);
//     tr.appendChild(tdOption);
//     tbodyListForAttendance.appendChild(tr);
//   }
// });

// /**
//  * Yoklama alma (tablodan)
// // function takeAttendance() {
// //   const selectList = document.getElementsByClassName("form-select") as HTMLCollectionOf<HTMLSelectElement>;
// //   const students = studentService.getStudents();
// //   const selectPraterTimeValue = document.getElementById("selectPraterTime") as HTMLSelectElement;
// //   const selectPraterTimeIndex = selectPraterTimeValue.selectedIndex;
// //   const selectPraterTime = selectPraterTimeValue.options[selectPraterTimeIndex].value;
// //   for (let index = 0; index < students.length; index++) {
// //     if (selectList[index].value === "+") {
// //       attendanceService.//takeAttendance(students[index], selectPraterTime, true);
// //     } else {
// //       attendanceService.takeAttendance(students[index], selectPraterTime, false);
// //     }
// //   }
// //   console.log(attendanceService.getAttendanceList());
// //   addStudentList();
// //   showStudentListForAttendance();

// // }


// /**
//   // for (let index = 0; index < trs.length; index++) {
//   //   const tds = trs[index].getElementsByTagName("td");
//   //   const select = tds[3].getElementsByTagName("select")[0];
//   //   const value = select.value;
//   //   const id = parseInt(tds[0].innerHTML);
//   //   const student = students.find((student) => student.id === id);
//   //   if (student) {
//   //     if (value === "-") {
//   //       student.absent++;
//   //     }
//   //   }
//   // }

//   // addStudentList();
//   // showStudentListForAttendance();
//   // console.log(students);
// */
// //  const attendance = attendanceList.find((attendance) => attendance.prayerTime === selectPraterTimeValue);
// //  if (attendance) {
// //    attendance.attendanceList = students;
// //  } else {
// //    attendanceList.push({ prayerTime: selectPraterTimeValue, attendanceList: students });
// //  }
// //  console.log(attendanceList);
// //  addStudentList();
// //  showStudentListForAttendance();
// // });




/*
takeAttendance(student: Student, prayerTime: string, isAbsence: boolean) {
    const attendance = this.attendances.find(
        (attendance) => attendance.prayerTime === prayerTime
    );
    if (attendance) {
        const studentAttendance = this.studentAttendances.find(
            (studentAttendance) =>
                studentAttendance.getAttendance().id === attendance.id &&
                studentAttendance.getStudent().id === student.id
        );
        if (studentAttendance) {
            if (isAbsence) {
                studentAttendance.isAbsence = true;
            } else {
                studentAttendance.isAbsence = false;
            }
        } else {
            const newStudentAttendance = new StudentAttendance(
                student,
                attendance,
                isAbsence
            );
            this.studentAttendances.push(newStudentAttendance);
        }
    } else {
        const newAttendance = new Attendance(this.sequence++, prayerTime);
        this.attendances.push(newAttendance);
        const newStudentAttendance = new StudentAttendance(
            student,
            newAttendance,
            isAbsence
        );
        this.studentAttendances.push(newStudentAttendance);
    }
}*/

// function listStudentsForAttendance() {
//     const attendance = attendanceService.getAttendanceList()[Number(mySelectAttendanceId.value)];
//     const map = attendance.attendanceList;
//     const students = studentService.getStudents();
//     tbodyListForAttendance.innerHTML = "";
//     students.forEach((student: Student) => {
//         const tr = document.createElement("tr");
//         const tdId = document.createElement("td");
//         const tdName = document.createElement("td");
//         const tdSurname = document.createElement("td");
//         const tdAttendance = document.createElement("td");

//         tdId.innerHTML = student.id.toString();
//         tdName.innerText = student.name;
//         tdSurname.innerText = student.surname;
//         tdAttendance.innerText = map.get(student).toString();

//         tr.appendChild(tdId);
//         tr.appendChild(tdName);
//         tr.appendChild(tdSurname);
//         tr.appendChild(tdAttendance);
//         tbodyListForAttendance.appendChild(tr);
//     });
// }





// function listAttendanceWithAttendanceId(){
//     tbodyListForAttendance.innerHTML = "";
//     const attendance = attendanceService.getAttendancesByAttendanceId(Number(mySelectAttendance.value));
//     attendance.attendanceList.forEach((value, key) => {
//         const tr = document.createElement("tr");
//         const tdId = document.createElement("td");
//         const tdName = document.createElement("td");
//         const tdSurname = document.createElement("td");
//         const tdAttendance = document.createElement("td");

//         tdId.innerHTML = key.id.toString();
//         tdName.innerText = key.name;
//         tdSurname.innerText = key.surname;
//         tdAttendance.innerText = value.toString();

//         tr.appendChild(tdId);
//         tr.appendChild(tdName);
//         tr.appendChild(tdSurname);
//         tr.appendChild(tdAttendance);
//         tbodyListForAttendance.appendChild(tr);
//     });
// }


// function listAttendanceWithStudentId() {
//     const selectListWithStudentId = document.getElementById("selectListWithStudentId") as HTMLSelectElement;
//     const selectListWithStudentIdValue = selectListWithStudentId.value;
//     const attendances = attendanceService.getAttendanceList();
//     const attendance = attendances.find((attendance) => attendance.id === parseInt(selectListWithStudentIdValue));
//     if (attendance) {
//         const tbodyListForAttendance = document.getElementById("tbodyListForAttendance") as HTMLTableSectionElement;
//         tbodyListForAttendance.innerHTML = "";
//         attendance.attendanceList.forEach((student: { id: { toString: () => string; }; name: string; surname: string; absent: { toString: () => string; }; }) => {
//             const tr = document.createElement("tr");
//             const date = document.createElement("td");
//             const prayerTime = document.createElement("td");
//             const absent = document.createElement("td");

//             date.innerText = attendance.today;
//             prayerTime.innerText = attendance.prayerTime;
//             absent.innerText = student.absent.toString();

//             tr.appendChild(date);
//             tr.appendChild(prayerTime);
//             tr.appendChild(absent);
//             tbodyListForAttendance.appendChild(tr);
//         });
//     }
// }

// mySelectAttendanceId.addEventListener("change", () => {
//  attendanceService.getAttendancesByAttendanceId(attendance.id).forEach((attendance) => {
//  console.log(attendance.student.name + " " + attendance.student.surname + " " + attendance.attendance);
// });


   /*  getStudents = async () => {
        const response = await fetch('http://localhost:3002/api/students');
        const data = await response.json();
        return data;
    }
    
    addStudent = async (name: string, surname: string) => {
        const student = new Student(this._sequence++, name, surname)
        this._students.push(student);
        const response = await fetch('http://localhost:3002/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, surname: surname})
        });
        const data = await response.json();
        return data;
    }
    
    updateStudent = async (studentId: number, name: string, surname: string) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, surname: surname})
        });
        const data = await response.json();
        return data;
    }
    
    deleteStudent = async (studentId: number) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data;
    }
    
    getStudent = async (studentId: number) => {
        const response = await fetch('http://localhost:3002/api/students/' + studentId);
        const data = await response.json();
        return data;
    } */