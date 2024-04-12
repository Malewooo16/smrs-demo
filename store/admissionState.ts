import {create} from "zustand"
interface IAdmission{
    admissionId:string;
    addAdmissionId:(id:string | undefined) => void;
    clearAdmission:()=>void;
}
const admissionStore = create <IAdmission>() ((set)=>({
    admissionId:"",
    addAdmissionId: (id) => set((state)=> ({...state, admissionId:id}) ),
    clearAdmission:()=> set({admissionId:""} )
}))

export default admissionStore