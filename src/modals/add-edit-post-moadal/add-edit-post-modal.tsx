import { ReactElement } from "react";
import ModalWrapper from "../../common/modal";
import { PostCard } from "../../interfaces/postCard";
import AddPostForm from "./add-post-form";

interface AddPostItemModal {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (val: PostCard) => void;
  editMode: boolean;
  initialData?: PostCard;
  updatePostData: (updatedData: PostCard) => void;
}

export function AddPostItem(props: AddPostItemModal): ReactElement {
  const { isOpen, closeModal, onSubmit, editMode, initialData, updatePostData } = props;

  const handleAddData = (newData: PostCard) => {
    onSubmit(newData);
  };

  const handleUpdateData = (updatedData: PostCard) => {
    console.log("Updated Data:", updatedData);
    updatePostData(updatedData);
  };

  return (
    <ModalWrapper open={isOpen} onClose={closeModal} maxWidth="437px">
      <AddPostForm
        onClose={closeModal}
        editMode={editMode}
        initialData={initialData}
        onUpdateData={handleUpdateData}
        onAddData={handleAddData}
      />
    </ModalWrapper>
  );
}