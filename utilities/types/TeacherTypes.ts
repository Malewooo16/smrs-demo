export interface TeacherForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    canAccessAcademics?: boolean;
    canAccessAdmissions?: boolean;
    canAccessDiscipline?: boolean;
  }
  