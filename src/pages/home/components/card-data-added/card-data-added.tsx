import React, { useState, useEffect } from "react";
import styles from "./card-data-added.module.scss";
import { useUpdateInnerActiveMutation } from "../../../../redux/slices/home";
import emptyState from "../../../../assets/images/emptyState.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import trash from "../../../../assets/icons/trashIcon.svg";
import edit from "../../../../assets/icons/editIcon.svg";
import view from "../../../../assets/icons/eyeIcon.svg";
import { Grid, IconButton } from "@mui/material";
import { CardDataJson } from "../../../../interfaces";
import { title } from "process";

interface PostAddedProps {
  postData: CardDataJson[];
  checkboxState: { [key: string]: boolean };
  onEditData: (updatedData: CardDataJson) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateIconClick: (item: any) => void;
  onPreviewCarousel: (itemId: string) => void;
}

const PostAdded: React.FC<PostAddedProps> = ({
  postData,
  checkboxState,
  onEditData,
  onDeleteItem,
  onUpdateIconClick,
  onPreviewCarousel,
}) => {
  const [items, setItems] = useState<CardDataJson[]>(postData);
  const [localCheckboxState, setLocalCheckboxState] = useState(checkboxState);
  const [editedItemId, setEditedItemId] = useState<string | null>(null);

  const [updateInnerActive] = useUpdateInnerActiveMutation();

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);
    const updatedFormData = updatedItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    setItems(updatedFormData);
  };

  useEffect(() => {
    setItems([...postData].sort((a, b) => a.order - b.order));
    setLocalCheckboxState(checkboxState);
  }, [checkboxState, postData]);

  const updateLocalCheckboxState = (itemId: string, checked: boolean) => {
    setLocalCheckboxState((prevState) => ({
      ...prevState,
      [itemId]: checked,
    }));
  };

  const handleCheckboxChange = async (itemId: string, checked: boolean) => {
    setLocalCheckboxState((prevState) => ({
      ...prevState,
      [itemId]: checked,
    }));

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, active: checked } : item
      )
    );

    const payload = {
      id: itemId,
      active: checked,
    };

    try {
      await updateInnerActive({ payload });
      console.log("API hit on Active Checkbox");
    } catch (error) {
      console.log("Error while updating checkbox state", error);
    }
  };

  const handleEditData = (itemId: string, editedData: CardDataJson) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, ...editedData } : item
    );
    setItems(updatedItems);
    onEditData(editedData);
  };

  const handleEditButtonClick = (itemId: string) => {
    setEditedItemId(itemId);
  };

  const handleModalClose = () => {
    setEditedItemId(null);
  };

  const handleSubmit = (item: CardDataJson[]) => {
    console.log(`Save data for item with ID: ${item}`);
  };

  const handleDeleteButtonClick = (itemId: string) => {
    onDeleteItem(itemId);
  };

  return (
    <Grid item xs={12} className={styles.tableContainer}>
      {postData.length > 0 ? (
        <>
          <form onSubmit={() => handleSubmit(items)}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div className={styles.Table} ref={provided.innerRef}>
                    <div className={styles.thead}>
                      <div className={styles.tr}>
                        <span className={`${styles.th} w-5`}>סדר</span>
                        <span className={`${styles.th} w-20`}>כותרת</span>
                        <span className={`${styles.th} w-25`}>תמונה</span>
                        <span className={`${styles.th} w-25`}>כתובת אתר</span>
                        <span className={`${styles.th} w-20`}></span>
                      </div>
                    </div>

                    {items.map((item: CardDataJson, index: number) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={styles.tr}
                          >
                            <span className={`${styles.td} w-5`}>{item.order}</span>
                            <span className={`${styles.td} w-20`}>{item.title}</span>
                            <span className={`${styles.td} w-25`}>
                              {item.description}
                            </span>
                            <span className={`${styles.td} w-25`}>{item.action}</span>
                            <span
                              className={`${styles.td} w-20`}
                              style={{ textAlign: "left" }}
                            >
                              <IconButton
                              classes={styles.iconBtn}
                                aria-label="edit"
                                size="small"
                                onClick={() => onUpdateIconClick(item)}
                              >
                                <img src={edit} alt="" />
                              </IconButton>
                              <IconButton
                              classes={styles.iconBtn}
                                aria-label="edit"
                                size="small"
                                onClick={() => onPreviewCarousel(item.id)}
                              >
                                <img src={view} alt="" />
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
                                onClick={() => handleDeleteButtonClick(item.id)}
                              >
                                <img src={trash} alt="" />
                              </IconButton>
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </form>
          <Grid container justifyContent="flex"></Grid>
        </>
      ) : (
        <div className={styles.no_data_state}>
          <img src={emptyState} width={200} alt="Empty" />
          <h3>No Items Added</h3>
        </div>
      )}
    </Grid>
  );
};

export default PostAdded;
