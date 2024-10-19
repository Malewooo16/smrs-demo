export interface ClassType {
  id: number;
  type: string;
  default: string;
  turnovers: number;
}

export const classTypeObject = [
    {id:1 , type:"O-Level  4 Years", default:"Form One", turnovers:0},
    {id:2,type:"A-Level 2 Years" , default:"Form Five", turnovers:0},
    {id:3, type:"Primary Education 6 Years" , default:"Grade One", turnovers:0}
];

export const classSubjects = []