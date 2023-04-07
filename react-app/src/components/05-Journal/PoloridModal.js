import Poloroid from "./Poloroid";
import { useState } from "react";
import { useModal } from "../../context/Modal";
import DeleteConfirmation from "../Modals/DeleteConfirmation";
import { useDispatch } from "react-redux";
import { deleteImageThunk } from "../../store/journal";

export default function PoloroidModal({ image }) {
  const { closeModal, setModalContent } = useModal();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteImageThunk(image.id));
    closeModal();
  };

  return (
    <>
      <div className="x-marks-the-spot">
        {" "}
        <i onClick={closeModal} className="fa-solid fa-x x-close"></i>
      </div>
      <div className="poloroid-modal">
        <Poloroid image={image} deleteConfirmation={deleteConfirmation} />
        {deleteConfirmation && (
          <div className="image-confirmation-container">
            <div className="delete-confirmation">
              Are you sure you want to delete this image?
            </div>
            <div
              className="poloroid-delete remove-image"
              onClick={handleDelete}
            >
              Remove Image
            </div>
          </div>
        )}
        <div
          className="poloroid-delete"
          onClick={() => setDeleteConfirmation((prev) => !prev)}
        >
          {deleteConfirmation ? "Cancel" : "Delete Image"}
        </div>
      </div>
    </>
  );
}
