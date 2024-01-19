import React, { useEffect, useState } from "react";
import styles from "./carousel-list.module.scss";
import { HeroCard } from "../../../interfaces/heroCard";
import emptyState from "../../../assets/images/emptyState.svg";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import { DraggableItem } from "../../../shared/dragabble-item/dragabble-item";

interface CarousalAddedProps {
  carousalData: HeroCard[];
  onEditData: (updatedData: HeroCard) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateIconClick: (item: any) => void;
  onPreviewCarousel: (itemId: string) => void;
}

const CarouselList: React.FC<CarousalAddedProps> = ({
  carousalData,
  onUpdateIconClick,
  onPreviewCarousel,
}) => {
  const [items, setItems] = useState<HeroCard[]>(carousalData);

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
  }, [carousalData]);

  const handleSubmit = (item: HeroCard[]) => {
    console.log(`Save data for item with ID: ${item}`);
  };

  return (
    <>
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
                          <span className={`${styles.th} w-5`}>סדר</span>
                          <span className={`${styles.th} w-20`}>כותרת</span>
                          <span className={`${styles.th} w-10`}>תמונה</span>
                          <span className={`${styles.th} w-25`}>כתובת אתר</span>
                          <span className={`${styles.th} w-25`}></span>
                        </div>
                      </div>

                      {carousalData.map((item: HeroCard, index: number) => (
                        <DraggableItem<HeroCard> // Specify the type here
                          key={item.id}
                          item={item}
                          index={index}
                          onUpdateIconClick={onUpdateIconClick}
                          onPreviewCarousel={onPreviewCarousel}
                          // handleDeleteButtonClick={handleDeleteButtonClick}
                        />
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
    </>
  );
};

export default CarouselList;
