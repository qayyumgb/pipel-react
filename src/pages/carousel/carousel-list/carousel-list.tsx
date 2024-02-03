import React, { useEffect, useState } from "react";
import styles from "./carousel-list.module.scss";
import { HeroCard } from "../../../interfaces/heroCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import { DraggableItem } from "../../../shared/dragabble-item/dragabble-item";
import { NoData } from "../../../shared";

interface CarousalAddedProps {
  carousalData: HeroCard[];
  onUpdateIconClick: (item: any) => void;
  onPreviewCarousel: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export const CarouselList: React.FC<CarousalAddedProps> = ({
  carousalData,
  onUpdateIconClick,
  onPreviewCarousel,
  onDeleteItem,
}) => {
  const [items, setItems] = useState<HeroCard[]>([]);

  useEffect(() => {
    setItems([...carousalData].sort((a, b) => a.order - b.order));
  }, [carousalData]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setItems((prevItems) =>
      updatedItems.map((item, index) => ({
        ...item,
        order: index + 1,
      })),
    );
  };

  const handleSubmit = (updatedItems: HeroCard[]) => {
    console.log("Save data for items: ", updatedItems);
  };

  console.log("Render CarouselList:", items);

  return (
    <>
      <Grid item xs={12} className={styles.tableContainer}>
        {items.length > 0 ? (
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

                      {items.map((item: HeroCard, index: number) => (
                        <DraggableItem<HeroCard>
                          key={item.id}
                          item={item}
                          index={index}
                          onUpdateIconClick={onUpdateIconClick}
                          onPreviewCarousel={onPreviewCarousel}
                          onDeleteItem={onDeleteItem}
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
          <NoData />
        )}
      </Grid>
    </>
  );
};
