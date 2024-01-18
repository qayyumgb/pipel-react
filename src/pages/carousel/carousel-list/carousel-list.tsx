import React, {useEffect, useState} from "react";
import styles from "./carousel-list.module.scss";
import {HeroCard} from "../../../interfaces/heroCard";
import {useUpdateInnerActiveMutation} from "../../../redux/slices/home";
import emptyState from "../../../assets/images/emptyState.svg";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {Grid} from "@mui/material";
import {DeleteItemModal} from "../../../modals/delete-item-modal/delete-item-modal";
import {DraggableItem} from "../../../shared/dragabble-item/dragabble-item";

interface CarousalAddedProps {
    carousalData: HeroCard[];
    onEditData: (updatedData: HeroCard) => void;
    onDeleteItem: (itemId: string) => void;
    onUpdateIconClick: (item: any) => void;
    onPreviewCarousel: (itemId: string) => void;
}

const DUMMY_CAROUSEL_DATA: HeroCard[] = Array.from({length: 10}, (_, index) => ({
    id: `item-${index + 1}`,
    title: `Title ${index + 1}`,
    description: `Description for item ${index + 1}.`,
    order: index + 1,
    active: index % 2 === 0,
    image: `image${index + 1}.jpg`,
    action: `Action ${index + 1}`,
}));
const CarouselList: React.FC<CarousalAddedProps> = ({
                                                         carousalData,
                                                         onEditData,
                                                         onDeleteItem,
                                                         onUpdateIconClick,
                                                         onPreviewCarousel,
                                                     }) => {
    const [items, setItems] = useState<HeroCard[]>(carousalData);
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

    }, [ carousalData]);



    const handleCheckboxChange = async (itemId: string, checked: boolean) => {

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? {...item, active: checked} : item
            )
        );

        const payload = {
            id: itemId,
            active: checked,
        };

        try {
            await updateInnerActive({payload});
            console.log("API hit on Active Checkbox");
        } catch (error) {
            console.log("Error while updating checkbox state", error);
        }
    };

    const handleEditData = (itemId: string, editedData: HeroCard) => {
        const updatedItems = items.map((item) =>
            item.id === itemId ? {...item, ...editedData} : item
        );
        setItems(updatedItems);
        onEditData(editedData);
    };

    const handleEditButtonClick = (itemId: string) => {
        setEditedItemId(itemId);
    };


    const handleSubmit = (item: HeroCard[]) => {
        console.log(`Save data for item with ID: ${item}`);
    };



    return (
        <>
            <Grid item xs={12} className={styles.tableContainer}>
                {DUMMY_CAROUSEL_DATA.length > 0 ? (
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

                                            {DUMMY_CAROUSEL_DATA.map((item: HeroCard, index: number) => (
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
                        <img src={emptyState} width={200} alt="Empty"/>
                        <h3>No Items Added</h3>
                    </div>
                )}
            </Grid>

        </>
    );
};

export default CarouselList;
