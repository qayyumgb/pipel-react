import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
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

        setItems(updatedItems);
    }


    useEffect(() => {
        setItems(cardAddedData)
        // Update local checkbox state when the external checkbox state changes
        setLocalCheckboxState(checkboxState);
    }, [checkboxState, cardAddedData]);

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

        const payload = {
            // create a payload for submitting form
        }

        try {
            await updateInnerActive({ payload: payload });
            // show some toast or snackbar message for success
            console.log("API hit on Active Checkbox")

        } catch (error) {
            console.log('error while adding form data', error);
        } finally {
            // incase if loader used, stop it here
        }
    };

    const handleEditCardData = (itemId: string, editedData: any) => {
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

    const handleSubmit = (item: CardDataJson[]) => {
        console.log(`Save data for item with ID: ${item}`);
    };

    const handleDeleteButtonClick = (itemId: string) => {
        onDeleteItem(itemId);
    };
    return (
        <Grid item xs={12}  >
            {cardAddedData.length > 0 ? (
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
                                                                        <Button variant="contained" style={{ padding: '5px' }} color='error' onClick={() => handleDeleteButtonClick(item.id)}>
                                                                            <DeleteIcon />
                                                                        </Button>
                                                                        <Button className='primary-btn' style={{ padding: '5px' }} variant="contained" color="success"
                                                                            onClick={() => handleEditButtonClick(item.id)}
                                                                        >
                                                                            <EditIcon />
                                                                        </Button>
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
