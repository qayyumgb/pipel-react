import { Button, Checkbox, FormControlLabel, Grid, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from "./card-data-added.module.scss";
import { useUpdateInnerActiveMutation } from '../../../../redux/slices/home';
import emptyState from '../../../../assets/images/emptyState.svg';
import { Link as RouterLink } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stringify } from 'json5';
import ModalWrapper from '../../../../common/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardDataJson } from '../../../../interfaces';
import CardDataEdit from '../card-data-edit-form/card-data-edit-form';

interface CarousalAddedProps {
    cardAddedData: CardDataJson[];
    checkboxState: { [key: string]: boolean };
    onEditData: (updatedData: CardDataJson) => void;
    onDeleteItem: (itemId: string) => void;
}

const CardDataAdded: React.FC<CarousalAddedProps> = ({ cardAddedData, checkboxState, onEditData, onDeleteItem }) => {
    const [items, setItems] = useState<CardDataJson[]>(cardAddedData);
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

        setItems(updatedItems);
    }

    const sortedCardData = [...cardAddedData].sort((a, b) => a.order - b.order);
    useEffect(() => {
        setItems(sortedCardData)
        // Update local checkbox state when the external checkbox state changes
        setLocalCheckboxState(checkboxState);
    }, [checkboxState, cardAddedData]);

    const updateLocalCheckboxState = (itemId: string, checked: boolean) => {
        setLocalCheckboxState((prevState) => ({
            ...prevState,
            [itemId]: checked,
        }));
    };

    const handleCheckboxChange = (itemId: string, checked: boolean) => {
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
            console.log("API hit on Active Checkbox");
        } catch (error) {
            console.log('error while updating checkbox state', error);
        } finally {
        }
    };

    const handleEditCardData = (itemId: string, editedData: any) => {
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
        <Grid item xs={12}  >
            {sortedCardData.length > 0 ? (
                <>
                    <form onSubmit={() => handleSubmit(items)}>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                    >
                                        {items.map((item: CardDataJson, index: number) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={stringify(item.id)}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className={styles.cardDataMain} key={index}>
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
                                                            <div className={styles.cardDataBody}>
                                                                <div className={styles.cardBodyInfo}>
                                                                    <div className={styles.cardDataEditBtn}>
                                                                    <IconButton aria-label="delete" size="small" color='error' onClick={() => handleDeleteButtonClick(item.id)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                            <IconButton aria-label="edit" size="small" style={{ marginLeft: '3px' }} onClick={() => handleEditButtonClick(item.id)}>
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                    </div>
                                                                    <ModalWrapper open={editedItemId === item.id} onClose={handleModalClose}>
                                                                        <CardDataEdit
                                                                            onClose={handleModalClose}
                                                                            onEditData={(editedData: any) => {
                                                                                handleEditCardData(item.id, editedData);
                                                                            }}
                                                                            initialData={item}
                                                                            updateLocalCheckboxState={updateLocalCheckboxState}
                                                                        />
                                                                    </ModalWrapper>
                                                                    <h5>{item.title}</h5>
                                                                    <p>{item.description}</p>

                                                                    <div className={styles.cardDataLinkBtn}>
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

export default CardDataAdded;
