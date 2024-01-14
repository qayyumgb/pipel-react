import { Button, Checkbox, FormControlLabel, Grid, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from "./carousel-added-data.module.scss";
import { HeroCard } from '../../../../interfaces/heroCard';
import { useUpdateInnerActiveMutation } from '../../../../redux/slices/home';
import emptyState from '../../../../assets/images/emptyState.svg';
import { Link as RouterLink } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stringify } from 'json5';
import ModalWrapper from '../../../../common/modal';
import EditCarousalForm from '../edit-carousel-form/edit-carousel-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CarousalAddedProps {
    carousalData: HeroCard[];
    checkboxState: { [key: string]: boolean };
    onEditData: (updatedData: HeroCard) => void;
    onDeleteItem: (itemId: string) => void;
}

const CarousalAdded: React.FC<CarousalAddedProps> = ({ carousalData, checkboxState, onEditData, onDeleteItem }) => {
    const [items, setItems] = useState<HeroCard[]>(carousalData);
    const [localCheckboxState, setLocalCheckboxState] = useState(checkboxState);
    const [editedItemId, setEditedItemId] = useState<string | null>(null);

    const [updateInnerActive] = useUpdateInnerActiveMutation();


    const handleDragEnd = (result: any) => {
        if (!result.destination) {
            return; // Dragged outside the list
        }

        const updatedItems = Array.from(items);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);
        const updatedFormData = updatedItems.map((item, index) => ({
            ...item,
            order: index + 1,
        }));
        setItems(updatedFormData);
    }

    const sortedCarouselData = [...carousalData].sort((a, b) => a.order - b.order);
    useEffect(() => {
        setItems(sortedCarouselData)
        // Update local checkbox state when the external checkbox state changes
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
            console.log('Error while updating checkbox state', error);
            // Handle error - show an error message or perform other actions
        } finally {
            // In case if loader used, stop it here
        }
    };

    const handleEditData = (itemId: string, editedData: any) => {
        // Update the item in the local state or dispatch an action to update it in Redux
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
        <Grid item xs={12}  >
            {sortedCarouselData.length > 0 ? (
                <>
                    <form onSubmit={() => handleSubmit(sortedCarouselData)}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                    >
                                        {items.map((item: HeroCard, index: number) => (
                                            <>
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className={styles.editCarousalCard} key={index}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={localCheckboxState[item.id] || false}
                                                                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                                                            name={`active-${item.id}`}
                                                                        />
                                                                    }
                                                                    label=""
                                                                />
                                                                <div className={styles.CarousalCardBody}>
                                                                    <img src={item?.image} width={120} />
                                                                    <div className={styles.cardBodyInfo}>
                                                                        <div className={styles.editCarousalData}>
                                                                            <IconButton aria-label="delete" size="small" color='error' onClick={() => handleDeleteButtonClick(item.id)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                            <IconButton aria-label="edit" size="small" style={{ marginLeft: '3px' }} onClick={() => handleEditButtonClick(item.id)}>
                                                                                <EditIcon />
                                                                            </IconButton>

                                                                        </div>
                                                                        <ModalWrapper open={editedItemId === item.id} onClose={handleModalClose}>
                                                                            <EditCarousalForm
                                                                                onClose={handleModalClose}
                                                                                onEditData={(editedData: any) => {
                                                                                    handleEditData(item.id, editedData);
                                                                                }}
                                                                                initialData={item}
                                                                                updateLocalCheckboxState={updateLocalCheckboxState}
                                                                            />
                                                                        </ModalWrapper>
                                                                        <h5>{item.title}</h5>

                                                                        <div className={styles.CarousalCardBtn}>
                                                                            <Button variant="contained" component={RouterLink} to={item.action} color="success">
                                                                                Link
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>


                                            </>





                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>


                        <Grid container justifyContent="flex-end">
                            <Button className='primary-btn'>Submit</Button>
                        </Grid>

                    </form>
                    <Grid container justifyContent="flex"></Grid>
                </>
            ) :
                (<div className={styles.no_data_state}>
                    <img
                        src={emptyState}
                        width={200}
                        alt="Empty"
                    />
                    <h3>No Items Added</h3>
                </div>)}

        </Grid>
    );
};

export default CarousalAdded;
