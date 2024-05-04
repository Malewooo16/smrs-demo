interface AdmissionStats {
  id: number;
  schoolId: number;
  status: String;
  selectedClass:string
}
export interface IStudentAdmission {
  id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  homeAddress: string;
  imgUrl: string | null;
  objects:{
    birthCert:string;
    transcripts:string;
  };
  AdmissionStats: AdmissionStats[];
}

export interface Classes{
  id:number;
  name:string;

}


export interface AdmissionData {
  id: number;
  admissionId:string;
  schoolId: number;
  status: string;
  selectedClass:string;
  admission: {
    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
    parentId:number;
    homeAddress: string;
    imgUrl: string | null;
    objects:{
      birthCert:string;
      transcripts:string;
    }
    Parent:{
      email:string;
    }
  };
}

export interface ISchoolAdmission {
  id: number;
  name: string;
  address: string;
  emailAddress:string;
  admissionStatus: boolean | null;
  admissionDates: { to: string; from: string };
  activeAdmissionClasses:{
    id:number,
    name:string
  } []
}
