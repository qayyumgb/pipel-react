import { Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Header, MainTabs } from "../../shared";
import { AddEditPostModal } from "../../modals";
import PreviewPostlItem from "../../modals/post-preview-modal/post-preview-modal";
import { useCarousel } from "./hooks";
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
  const [isEdit, setISEdit] = useState<boolean | undefined>(false);

  const [previewPostlItem, setPreviewPostItem] = useState<
    PostCard | string | null
  >(null);
  const [isRandomOrderActive, setRandomOrderActive] = useState<boolean>(false);
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage,
  );
  const { checkBoxHandler, handleEditData } = useCarousel({
    setRandomOrderActive: setRandomOrderActive,
    setCarousalData: setPostData,
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

  const onUpdateIconClick = (item: any) => {
    setEditingItem(item);
    setISEdit(true);
    setIsAddNew(true);
  };
  const onAddButtonClick = () => {
    // setInitialFormObject(INITIAL_FORM_OBJECT);
    setIsAddNew(true);
  };

  const onDeleteItem = (itemId: string) => {
    setPostData(postData.filter((item) => item.id != itemId));
  };

  const handleAddData = (
    data: PostCard,
    isAddNew: boolean,
    isEdit: boolean | undefined,
  ) => {
    if (isEdit) {
      const index = postData.findIndex((item: PostCard) => item.id === data.id);
      if (index !== -1) {
        const updatedPosts = [...postData];
        updatedPosts[index] = { ...postData[index], ...data };
        setPostData(updatedPosts);
        console.log("updatedPosts" + JSON.stringify(updatedPosts));
        setISEdit(false);
        setIsAddNew(false);
      }
    } else if (isAddNew) {
      setPostData((prevData: PostCard[]) => [...prevData, data]);
      setIsAddNew(false);
    }
  };
  const onEditSubmitt = (
    val: PostCard[],
    isAddNew: boolean,
    isEdit: boolean,
  ) => {
    console.log("====================================");
    console.log({ val });
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
          <MainTabs />
          <Grid className={styles.mainScroll}>
            <PostList
              postsList={postData}
              onEditData={onEditSubmitt}
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
        <AddEditPostModal
          isOpen={isAddNew}
          closeModal={() => setIsAddNew(false)}
          onSubmit={handleAddData}
          editingItem={editingItem}
          isEdit={isEdit}
        />
      )}
    </>
  );
};
