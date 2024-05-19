import ScoresManagementUI from "@/app/main-components/RecordsManager";
import {getAdvancedStudentData} from "@/actions/students/getStudentInfo"

export default  async function ClassRecords({params}:{params:{classId:string}}){
  const aClass = await getAdvancedStudentData(parseInt(params.classId))
  console.log(aClass);
  
  return(
    <ScoresManagementUI classId={parseInt(params.classId as string)} />
  )

}