interface AdmissionStats{
  id:number;
  schoolId:number;
  status:String;
}
export interface IStudentAdmission {
    id:string;
    firstName: string;
    lastName: string;
    dob: Date;
    homeAddress: string;
    imgUrl:string | null;
    AdmissionStats:AdmissionStats[]
    
  }


export interface ISchoolAdmission{
    id: number;
    name: string;
    address: string;
    admissionStatus: boolean | null;
    admissionDates: {to:string; from:string;};
}