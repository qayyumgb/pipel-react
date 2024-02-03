import styles from "./dragabble-item.module.scss";
import React, { ReactElement, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IconButton } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { TrashIcon } from "../../icons/trash-icon";
import { EyeIcon } from "../../icons/eye-icon";
import { EditIcon } from "../../icons/edit-icon";
import { DeleteItemModal } from "../../modals/delete-item-modal/delete-item-modal";

interface DraggableItemProps<T> {
  item: T;
  index: number;
  onUpdateIconClick: (item: T) => void;
  onPreviewCarousel: (id: string) => void;
}

interface DraggableDefaultProps {
  id: string;
  order: number;
  title: string;
  description?: string;
  image?: string;
  action: string;
}

export function DraggableItem<T extends DraggableDefaultProps>(
  props: DraggableItemProps<T>,
): ReactElement {
  const { item, index, onUpdateIconClick, onPreviewCarousel } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const deleteItemCallback = () => {
    console.log(item.id);
  };

  return (
    <>
      <Draggable draggableId={item.id.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={styles.tr}
          >
            <span className={`${styles.td} w-5`}>{item.order}</span>
            <span className={`${styles.td} w-20`}>{item.title}</span>
            <span className={`${styles.td} w-10`}>
              {Boolean(item?.image) ? (
                <img src={item.image} className={styles.itemImage} alt="" />
              ) : (
                item?.description
              )}
            </span>
            <span className={`${styles.td} w-25`}>{item.action}</span>
            <span className={`${styles.td} w-25`} style={{ textAlign: "left" }}>
              <IconButton
                classes={styles.iconBtn}
                aria-label="edit"
                size="small"
                onClick={() => onUpdateIconClick(item)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                classes={styles.iconBtn}
                aria-label="edit"
                size="small"
                onClick={() => onPreviewCarousel(item.id)}
              >
                <EyeIcon />
              </IconButton>
              <IconButton
                classes={styles.iconBtn}
                aria-label="delete"
                size="small"
                {...provided.dragHandleProps}
              >
                <ZoomOutMapIcon />
              </IconButton>
              <IconButton
                classes={styles.iconBtn}
                aria-label="delete"
                size="small"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <TrashIcon />
              </IconButton>
            </span>
          </div>
        )}
      </Draggable>
      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteItemCallback}
      />
    </>
  );
}
