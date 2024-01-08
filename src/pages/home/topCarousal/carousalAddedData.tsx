import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import styles from "./index.module.scss";
import { HeroCard } from '../../../interfaces/heroCard';
import { useUpdateInnerActiveMutation } from '../../../redux/slices/home';
import emptyState from '../../../assets/images/emptyState.svg';
import { Link as RouterLink } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { stringify } from 'json5';

interface CarousalAddedProps {
    carousalData: HeroCard[];
    checkboxState: { [key: string]: boolean };
}

const CarousalAdded: React.FC<CarousalAddedProps> = ({ carousalData, checkboxState }) => {
    const [items, setItems] = useState<HeroCard[]>(carousalData);
    const [localCheckboxState, setLocalCheckboxState] = useState(checkboxState);

    const [updateInnerActive] = useUpdateInnerActiveMutation();

    const handleDragEnd =   (result:any) =>{
        if (!result.destination) {
            return; // Dragged outside the list
          }
        
          const updatedItems = Array.from(items);
          const [reorderedItem] = updatedItems.splice(result.source.index, 1);
          updatedItems.splice(result.destination.index, 0, reorderedItem);
        
          setItems(updatedItems);
    }
     

    useEffect(() => {
        setItems(carousalData)
        // Update local checkbox state when the external checkbox state changes
        setLocalCheckboxState(checkboxState);
    }, [checkboxState,carousalData]);

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

    const handleSubmit = (item: HeroCard[]) => {
        console.log(`Save data for item with ID: ${item}`);
    };

    return (
        <Grid item xs={12}  >
                {carousalData.length > 0 ? (
                    <>
                   <form onSubmit={() => handleSubmit(carousalData)}>
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
                    draggableId={stringify(item.id)}
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
