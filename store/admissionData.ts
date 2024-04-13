import { create } from "zustand";

interface IAdmissionData{
    id:string;
    firstName:string;
    lastName:string;
    dob:Date;
    homeAddress:string;
}
interface IAdmissionState{
    data:IAdmissionData[],
    addAdmissionData:(newData:IAdmissionData) => void;
    
}
const useAdmissionData = create<IAdmissionState>((set)=>({
    data:[],
    addAdmissionData:(newData)=>set((state)=>({data:[...state.data, newData]}))
}))

export default useAdmissionData