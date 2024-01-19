import styles from './add-item-modal.module.scss';
import React, {ReactElement} from "react";
import ModalWrapper from "../../common/modal";
import AddCarousalData from "../../pages/home/components/add-carousel-form/add-carousel-form";
import {HeroCard} from "../../interfaces";

interface AddItemModalProps {
    isOpen: boolean;
    closeModal: () => void;

}
export function AddItemModal(props: AddItemModalProps): ReactElement {
    const { isOpen, closeModal } = props;
    const handleAddData = (newData: HeroCard) => {
       console.log("handle add data", newData);
    };

    return (
        <ModalWrapper
            open={isOpen}
            onClose={closeModal}
            maxWidth='437px'
        >
            <AddCarousalData
                onClose={closeModal}
                onAddData={handleAddData}
            />
        </ModalWrapper>
    )
}