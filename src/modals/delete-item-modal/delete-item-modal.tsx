import classes from "./delete-item-modal.module.scss";
import React, {ReactElement} from "react";
import ModalWrapper from "../../common/modal";
import {Button, Grid} from "@mui/material";

interface DeleteItemModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onConfirm: () => void;
}

export function DeleteItemModal(props: DeleteItemModalProps): ReactElement {
    const {isOpen, closeModal, onConfirm} = props;
    return (
        <ModalWrapper
            maxWidth='437px'
            open={isOpen}
            onClose={closeModal}
        >
            <div>
                <p>Are you sure you want to delete this item?</p>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button className="primary-btn" onClick={onConfirm}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            className="secondary-btn"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </ModalWrapper>
    )
}