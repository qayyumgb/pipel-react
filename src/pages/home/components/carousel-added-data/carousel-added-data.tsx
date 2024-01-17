import React, { useState, useEffect } from "react";
import styles from "./carousel-added-data.module.scss";
import { HeroCard } from "../../../../interfaces/heroCard";
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

interface CarousalAddedProps {
  carousalData: HeroCard[];
  checkboxState: { [key: string]: boolean };
  onEditData: (updatedData: HeroCard) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateIconClick: (item: any) => void;
  onPreviewCarousel: (itemId: string) => void;
}

const CarousalAdded: React.FC<CarousalAddedProps> = ({
  carousalData,
  checkboxState,
  onEditData,
  onDeleteItem,
  onUpdateIconClick,
  onPreviewCarousel,
}) => {
  const [items, setItems] = useState<HeroCard[]>(carousalData);
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
    setItems([...carousalData].sort((a, b) => a.order - b.order));
    setLocalCheckboxState(checkboxState);
  }, [checkboxState, carousalData]);

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

  const handleEditData = (itemId: string, editedData: HeroCard) => {
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

  const handleSubmit = (item: HeroCard[]) => {
    console.log(`Save data for item with ID: ${item}`);
  };

  const handleDeleteButtonClick = (itemId: string) => {
    onDeleteItem(itemId);
  };

  return (
    <Grid item xs={12} className={styles.tableContainer}>
      {carousalData.length > 0 ? (
        <>
          <form onSubmit={() => handleSubmit(items)}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div className={styles.Table} ref={provided.innerRef}>
                    <div className={styles.thead}>
                      <div className={styles.tr}>
                        <span className={styles.th}>סדר</span>
                        <span className={styles.th}>כותרת</span>
                        <span className={styles.th}>תמונה</span>
                        <span className={styles.th}>כתובת אתר</span>
                        <span className={styles.th}></span>
                      </div>
                    </div>

                    {items.map((item: HeroCard, index: number) => (
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
                            <span className={styles.td}>{item.order}</span>
                            <span className={styles.td}>{item.title}</span>
                            <span className={styles.td}>
                              <img
                                src={item?.image}
                                className={styles.itemImage}
                                alt=""
                              />
                            </span>
                            <span className={styles.td}>{item.action}</span>
                            <span
                              className={styles.td}
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

export default CarousalAdded;
