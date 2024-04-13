export interface IStudentAdmission {
    firstName: string;
    lastName: string;
    dob: string;
    homeAddress: string;
    
  }

export interface ISchoolAdmission{
    id: number;
    name: string;
    address: string;
    admissionStatus: boolean | null;
    admissionDates: {to:string; from:string;};
}