import React, { useEffect, useState } from "react";
import styles from "./post-list.module.scss";
import { HeroCard } from "../../../interfaces/heroCard";
import { NoData } from "../../../shared";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import { DraggableItem } from "../../../shared/dragabble-item/dragabble-item";
import { PostCard } from "../../../interfaces/postCard";

export interface CarousalAddedProps {
  postsList: PostCard[];
  onEditData: (val: PostCard[], isAddNew: boolean, isEdit: boolean) => void;
  onDeleteItem: (itemId: string) => void;
  onUpdateIconClick: (item: any) => void;
  onPreviewCarousel: (itemId: string) => void;
}
export const PostList: React.FC<CarousalAddedProps> = ({
  postsList,
  onUpdateIconClick,
  onPreviewCarousel,
  onDeleteItem,
  onEditData,
}) => {
  const [items, setItems] = useState<PostCard[]>(postsList);

  useEffect(() => {
    setItems([...postsList].sort((a, b) => a.order - b.order));
  }, [postsList]);
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


  const handleSubmit = (items: PostCard[]) => {
    onEditData(items, false, true);
  };

  return (
    <>
      <Grid item xs={12} className={styles.tableContainer}>
        {postsList.length > 0 ? (
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

                      {items.map((item: PostCard, index: number) => (
                        <DraggableItem<PostCard> // Specify the type here
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
