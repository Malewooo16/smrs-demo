"use client";

export default function DaisyModal() {
  return (
    <>
      <button
        className="btn bg-transparent border-none hover:bg-transparent"
        onClick={() =>
          (
            document.getElementById("my_modal_1") as HTMLDialogElement
          ).showModal()
        }
      >
        {" "}
        <div className="card bg-white w-96 ">
          {" "}
          <p className="font-semibold text-lg px-6 py-4 rounded-tl-md rounded-tr-none">
            {" "}
            Add new class +{" "}
          </p>{" "}
        </div>
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
