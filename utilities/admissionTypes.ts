export interface IStudentAdmission {
    id:string;
    firstName: string;
    lastName: string;
    dob: Date;
    homeAddress: string;
    imgUrl:string | null;
    
  }

export interface ISchoolAdmission{
    id: number;
    name: string;
    address: string;
    admissionStatus: boolean | null;
    admissionDates: {to:string; from:string;};
}