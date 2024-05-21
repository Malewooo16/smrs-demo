import RecordList from "@/app/main-components/RecordList"
import  RecordDetail  from "@/app/main-components/RecordDetails"


const records = [
  { name: "Semester 1 2024" },
  { name: "Record2" },
  { name: "Record3" },
  // Add more records as needed
];

const RecordsManager = () => {
  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <RecordList records={records} />
      </div>
      <div className="w-2/3 p-4">
        <RecordDetail />
      </div>
    </div>
  );
};

export default RecordsManager;
