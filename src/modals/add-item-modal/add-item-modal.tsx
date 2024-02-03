import styles from "./add-item-modal.module.scss";
import React, { ReactElement } from "react";
import ModalWrapper from "../../common/modal";
import AddCarousalData from "../../pages/home/components/add-carousel-form/add-carousel-form";
import { HeroCard } from "../../interfaces";

interface AddItemModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (val: HeroCard) => void;
}
export function AddItemModal(props: AddItemModalProps): ReactElement {
  const { isOpen, closeModal, onSubmit } = props;
  const handleAddData = (newData: HeroCard) => {
    onSubmit(newData);
  };

  return (
    <ModalWrapper open={isOpen} onClose={closeModal} maxWidth="437px">
      <AddCarousalData onClose={closeModal} onAddData={handleAddData} />
    </ModalWrapper>
  );
}
