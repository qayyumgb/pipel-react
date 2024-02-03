import CloseIcon from "@mui/icons-material/Close";
import {Button, Grid, IconButton, styled} from "@mui/material";
import React, {useState, FC} from "react";
import InputForm from "../../common/form-input";
import LabelForm from "../../common/form-label";
import ModalWrapper from "../../common/modal";
import styles from "./add-edit-post-modal.module.scss";
import {PostCard} from "../../interfaces";
import usePostsMutation, {CarouselAddItemData} from "../../hooks/usePostsMutation";

const INITIAL_FORM_OBJECT = {
    id: "",
    title: "",
    description: "",
    order: 0,
    active: false,
    image: "",
    action: "",
};

interface AddEditPostModalProps {
    isOpen: boolean;
    closeModal: () => void;
    onSubmit: (val: PostCard) => void;
}

export const AddEditPostModal: FC<AddEditPostModalProps> = (props) => {
    const {isOpen, closeModal, onSubmit} = props;
    const [formData, setFormData] = useState(INITIAL_FORM_OBJECT);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
    const {mutate, isLoading, isError, data, error} = usePostsMutation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   const generatedId = Date.now().toString();
    //   const newDataItem = { ...formData, id: generatedId };
    //   onSubmit(newDataItem);
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData: any) => ({...prevData, [name]: value}));
    };

    return (
        <ModalWrapper open={isOpen} onClose={closeModal} maxWidth="437px">
            <form onSubmit={handleSubmit}>
                <Grid
                    className={styles.modalHeader}
                    item
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <h2 style={{margin: 0, fontSize: 24, fontWeight: 600}}>Add Item</h2>
                    <IconButton
                        onClick={closeModal}
                        aria-label="close"
                        style={{padding: "5px", background: "#E5E7EB"}}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Grid>

                <div className="formGroup">
                    <LabelForm labelText="כותרת"/>
                    <InputForm
                        type="text"
                        placehloder="Enter title here"
                        name="title"
                        onChange={handleInputChange}
                        value={formData.title}
                        id="title"
                    />
                </div>

                <div className="formGroup">
                    <LabelForm labelText="כתובת אתר"/>
                    <InputForm
                        name="action"
                        value={formData.action}
                        onChange={handleInputChange}
                        type="url"
                        placehloder="Enter button url here"
                        id="action"
                    />
                </div>

                <div className="formGroup">
                    <LabelForm labelText="סדר"/>
                    <InputForm
                        name="order"
                        value={formData.order}
                        onChange={handleInputChange}
                        type="number"
                        placehloder="Enter order here"
                        id="order"
                    />
                </div>

                <Grid display={"flex"} justifyContent={"center"} className="formGroup">
                    <Button
                        variant="contained"
                        className="primary-btn btn-round"
                        type="submit"
                        color="success"
                    >
                        Add Data
                    </Button>
                </Grid>
            </form>
        </ModalWrapper>
    );
};
