import {Container, Grid} from "@mui/material";
import {FC, useState} from "react";
import {Header, MainTabs} from "../../shared";
import {AddEditPostModal, PostPreviewModal} from "../../modals";
import {useCarousel} from "./hooks";
import {PostList} from "./post-list/post-list";
import styles from "./post.module.scss";
import {PostCard} from "../../interfaces/postCard";
import {useFetchData} from "../../hooks/useFetchData";
import {GET_ALL_POSTS} from "../../endpoints/endpoints";
import {useSnackbar} from "../../layout/snackbar/snackbar-context";

export const Post: FC = () => {
    const [isAddNew, setIsAddNew] = useState(false);
    const [isPreviewModal, setIsPreviewModal] = useState(false);
    const {data, isLoading} = useFetchData<PostCard[]>(GET_ALL_POSTS);
    const [postData, setPostData] = useState<PostCard[]>(data ?? []);


    const [previewCarouselItem, setPreviewCarouselItem] = useState<
        PostCard | string | null
    >(null);
    const [isRandomOrderActive, setRandomOrderActive] = useState<boolean>(false);
    const {checkBoxHandler, handleEditData, handleOpenCarouselDeleteModal} =
        useCarousel({
            setRandomOrderActive: setRandomOrderActive,
            setCarousalData: setPostData,
            isRandomOrderActive,
        });

    const onPreviewIconClick = (itemId: string) => {
        setPreviewCarouselItem(itemId);
    };

    const onUpdateIconClick = (item: any) => {
        // setInitialFormObject(item);
        setIsAddNew(true);
    };
    const onAddButtonClick = () => {
        // setInitialFormObject(INITIAL_FORM_OBJECT);
        setIsAddNew(true);
    };

    const handleAddData = (data: PostCard) => {
        console.log("====================================");
        console.log({data});
        console.log("====================================");
    };
    return (
        <>
            <Container>
                <Grid item xs={12} className={styles.listWrapper}>
                    <Header
                        checkBoxHandler={checkBoxHandler}
                        onAddButtonClick={onAddButtonClick}
                        isRandomOrderActive={isRandomOrderActive}
                    />
                    <MainTabs/>
                    <Grid>
                        <PostList
                            postsList={data ?? []}
                            onEditData={handleEditData}
                            onDeleteItem={handleOpenCarouselDeleteModal}
                            onUpdateIconClick={onUpdateIconClick}
                            onPreviewCarousel={onPreviewIconClick}
                        />

                        {isPreviewModal && (
                            <PostPreviewModal
                                id={""} //passed selected item id
                                title={""} //passed selected item title
                                action={""} //passed selected item action
                                order={0} //passed selected item order
                                onClose={() => {
                                    setIsPreviewModal(false);
                                    setPreviewCarouselItem(null);
                                }}
                                description={""}
                                isPreViewOpen={isPreviewModal}
                            />
                        )}
                    </Grid>
                </Grid>
            </Container>
            {isAddNew && (
                <AddEditPostModal
                    isOpen={isAddNew}
                    closeModal={() => setIsAddNew(false)}
                    onSubmit={handleAddData}
                />
            )}
        </>
    );
};
