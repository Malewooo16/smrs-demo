export default function ObjectsUplaod(props:{setNextStep:()=>void}) {
  const uploadAdmissionFiles = () =>{
    props.setNextStep()
  }
  return (
    <div>
      <form action={uploadAdmissionFiles}>
        <h1 className="text-lg my-2">Upload the files detailed below</h1>
        <div className="join join-vertical flex max-w-xl">
          <label className="form-control max-w-xl mb-4 join-item">
            <p className="mb-2"> Birth Certificate</p>
            <input
              type="file"
              placeholder="Type here"
              className="file-input file-input-bordered w-full "
              name="birthCert"
            />
          </label>
          <label className="form-control max-w-xl my-4 join-item">
            <p className="my-2"> School Transcripts</p>
            <input
              type="file"
              placeholder="Type here"
              className="file-input file-input-bordered w-full "
              name="transcripts"
            />
          </label>
          <label className="form-control max-w-xl mt-4 mb-10 join-item">
            <p className="my-2">
              Medical Records <span className="text-md">(optional)</span>
            </p>
            <input
              type="file"
              max={"2007-12-31"}
              placeholder="Type here"
              className="file-input file-input-bordered w-full "
              name="medicalRecords"
            />
          </label>
          <button className="btn btn-success my-10" type="submit">
            {" "}
            Add User Details{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
