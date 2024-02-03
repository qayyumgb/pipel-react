import { Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Header, MainTabs } from "../../shared";
import { AddPostItem } from "../../modals";
import PreviewPostlItem from "../../modals/post-preview-modal/post-preview-modal";
import { usePost } from "./hooks";
import { PostList } from "./post-list/post-list";
import styles from "./post.module.scss";
import { PostCard } from "../../interfaces/postCard";
import { useFetchData } from "../../hooks/useFetchData";
import { GET_ALL_POSTS } from "../../endpoints/endpoints";
import { useSnackbar } from "../../layout/snackbar/snackbar-context";
import { DUMMY_POST_DATA, DUMMY_POST_DATA_HEBREW } from "./data";
import { useAppSelector } from "../../redux";

export const Post: FC = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const { data, isLoading } = useFetchData<PostCard[]>(GET_ALL_POSTS);
  const [postData, setPostData] = useState<PostCard[]>(DUMMY_POST_DATA);
  const [editingItem, setEditingItem] = useState<PostCard | undefined>(
    undefined,
  );

  const [previewPostlItem, setPreviewPostItem] = useState<
    PostCard | string | null
  >(null);
  const [isRandomOrderActive, setRandomOrderActive] = useState<boolean>(false);
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage,
  );
  const {
    checkBoxHandler,
    handleEditData,
    handleOpenCarouselDeleteModal,
    handleAddData,
  } = usePost({
    setRandomOrderActive: setRandomOrderActive,
    setPostData: setPostData,
    isRandomOrderActive,
  });


  useEffect(() => {
    setPostData(
      currentLanguage == "EN" ? DUMMY_POST_DATA : DUMMY_POST_DATA_HEBREW,
    );
  }, [currentLanguage]);

  const onPreviewIconClick = (itemId: string) => {
    setPreviewPostItem(itemId);
    setIsPreviewModal(true);
  };

  const onUpdateIconClick = (item: PostCard) => {
    setEditingItem(item);
    setIsAddNew(true);
  };
  const onAddButtonClick = () => {
    setEditingItem(undefined);
    setIsAddNew(true);
  };

  const onDeleteItem = (itemId: string) => {
    setPostData(postData.filter((item) => item.id != itemId));
  };

  const handleSubmission = (formData: PostCard) => {
    if (editingItem) {
      const updatedData: PostCard = {
        ...editingItem,
        ...formData,
      };

      setPostData((prevData) => {
        const updatedIndex = prevData.findIndex(
          (item) => item.id === updatedData.id
        );
        if (updatedIndex !== -1) {
          const newData = [...prevData];
          newData[updatedIndex] = updatedData;
          return newData;
        }
        return prevData;
      });
    } else {
      handleAddData(formData);
    }
    setIsAddNew(false);
    setEditingItem(undefined);
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
          <MainTabs />
          <Grid>
            <PostList
              postData={postData}
              onDeleteItem={onDeleteItem}
              onUpdateIconClick={onUpdateIconClick}
              onPreviewCarousel={onPreviewIconClick}
            />

            {isPreviewModal && (
              <PreviewPostlItem
                postData={postData}
                onClose={() => {
                  setIsPreviewModal(false);
                  setPreviewPostItem(null);
                }}
                selectedItemId={previewPostlItem}
                isShow={isPreviewModal}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      {isAddNew && (
        <AddPostItem
          isOpen={true}
          closeModal={() => {
            setIsAddNew(false);
            setEditingItem(undefined);
          }}
          onSubmit={handleSubmission}
          editMode={!!editingItem}
          initialData={editingItem}
          updatePostData={handleEditData}
        />
      )}
    </>
  );
};
