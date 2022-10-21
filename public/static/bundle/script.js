var students = [
    {
        name: 'Veli',
        surname: 'Çam',
    },
    {
        name: 'Abdurrahman',
        surname: 'Kutlu',
    },
    {
        name: 'Emre',
        surname: 'Yavuz',
    },
    {
        name: 'Enes Bahadir',
        surname: 'Yildirim',
    },
    {
        name: 'Oğuz Kaan',
        surname: 'Koca',
    },
    {
        name: 'Enver',
        surname: 'Yildirim',
    },
]

var editMode = false
var editStudentIdIpm

document.addEventListener('DOMContentLoaded', function () {
    renderStudents()
})

function enableEditMode() {
    editMode = true
}

function disableEditMode() {
    editMode = false
}

function renderStudents() {
    var html = ''
    for (var i = 0; i < students.length; i++) {
        var student = students[i]
        html += '<li class="student">'
        html += '<p><span>Name:</span>' + student.name + '</p>'
        html += '<p><span>Surname:</span>' + student.surname + '</p>'
        html += '<i class="student-delete" onclick="onDeleteStudent(' + i + ')">X</i>'
        html += '<i class="student-edit" onclick="onEditStudent(' + i + ')">Edit</i>'
        html += '</li>'
    }
    setHTML('#students-list', html)
}


function onEditStudent(index) {
    var student = getStudent(index)
    editStudentIdIpm = index
    setValueStudent('.student-form .name', student.name)
    setValueStudent('.student-form .surname', student.surname)

    setHTML('.createStudent', 'Save')
    enableEditMode()
}

function setValueStudent(selector, value) {
    var element = document.querySelector(selector)
    element.value = value
}

function getStudent(index) {
    return students[index]
}

function onDeleteStudent(index) {
    if (confirm('Are you sure???')) {
        deleteStudent(index)
    }

    renderStudents()
}

function deleteStudent(index) {
    students.splice(index, 1)
}

function setHTML(selector, html) {
    var studentElement = document.querySelector(selector)
    studentElement.innerHTML = html
}

function getInputValue(selector) {
    var inputValue = document.querySelector(selector)
    return inputValue.value
}
function editStudentHandle() {
    var name = getInputValue('.student-form .name')
    var surname = getInputValue('.student-form .surname')

    studentIndex(editStudentIdIpm, {
        name: name,
        surname: surname,
    })
    renderStudents()
    disableEditMode()
    setHTML('.createStudent', 'Create')
    studentsFormReset()

}

function studentIndex(index, student) {
    students[index] = student
}

function studentsFormReset() {
    setValueStudent('.student-form .name', '')
    setValueStudent('.student-form .surname', '')
}

function onClickCreateStudent() {
    if (editMode == true) {
        editStudentHandle()
    } else {
        var name = getInputValue('.student-form .name')
        var surname = getInputValue('.student-form .surname')

        var student = {
            name: name,
            surname: surname,
        }
    }

    addStudent(student)
    renderStudents()
    studentsFormReset()
}

function addStudent(student) {
    students.push(student)
}