import styles from "./add-item-modal.module.scss";
import React, { ReactElement } from "react";
import ModalWrapper from "../../common/modal";
import AddCarousalData from "../../pages/home/components/add-carousel-form/add-carousel-form";
import { HeroCard } from "../../interfaces";

interface AddItemModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (val: HeroCard) => void;
  editMode: boolean;
  initialData?: HeroCard;
  onUpdateData: (updatedData: HeroCard) => void;
}

export function AddItemModal(props: AddItemModalProps): ReactElement {
  const { isOpen, closeModal, onSubmit, editMode, initialData, onUpdateData } = props;

  const handleAddData = (newData: HeroCard) => {
    onSubmit(newData);
  };

  const handleUpdateData = (updatedData: HeroCard) => {
    console.log("Updated Data:", updatedData);
    onUpdateData(updatedData);
  };

  return (
    <ModalWrapper open={isOpen} onClose={closeModal} maxWidth="437px">
      <AddCarousalData
        onClose={closeModal}
        editMode={editMode}
        initialData={initialData}
        onUpdateData={handleUpdateData}
        onAddData={handleAddData}
      />
    </ModalWrapper>
  );
}
