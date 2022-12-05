import { studentCrud } from "./view/student-crud";
import { attendanceCrud } from "./view/attendance-crud";
import { listByAttendance } from "./view/list-by-attendance";
import { listByStudent } from "./view/list-by-student";


//TODO: Burada render hatası var sadece en üstteki çalışıyor.

// Path: src/view/student-crud.ts
studentCrud();

// Path: src/view/attendance-crud.ts
attendanceCrud();

// Path: src/view/list-by-attendance.ts
listByAttendance();

// Path: src/view/list-by-student.ts
listByStudent();
