import { PostCard } from "../../../interfaces";
import { useUploadSomeDataMutation } from "../../../redux/slices/home";

// Define the type for the custom hook's props (if any)
interface UsePostProps {
  // Define your props here
  isRandomOrderActive: boolean;
  setRandomOrderActive: (val: boolean) => void;
  setPostData: (val: any) => void;
}

// Define the return type of the custom hook
interface UsePostReturn {
  handleEditData: (updatedData: PostCard) => void;
  handleAddData: (newData: PostCard) => void;
  checkBoxHandler: () => void;
  handleOpenCarouselDeleteModal: (itemId: string) => void;
}

// Define the custom hook function
export const usePost = (props: UsePostProps): UsePostReturn => {
  const { setRandomOrderActive, setPostData, isRandomOrderActive } = props;
  const [uploadSomeData] = useUploadSomeDataMutation();

  const handleEditData = (updatedData: PostCard) => {
    setPostData((prevData: PostCard[]) =>
      prevData.map((item) =>
        item.id === updatedData?.id ? updatedData : item,
      ),
    );
  };

  const handleAddData = (newData: PostCard) => {
    console.log({ newData });
    setPostData((prevData: PostCard[]) => [...prevData, newData]);
  };

  const checkBoxHandler = async () => {
    const payload = {
      // create a payload for submitting form
    };

    try {
      await uploadSomeData({ payload: payload });
      console.log("API Hit for Random Order");

      // show some toast or snackbar message for success
    } catch (error) {
      console.error("Error while adding form data", error);
    } finally {
      // in case if loader used, stop it here
    }

    setRandomOrderActive(!isRandomOrderActive);
  };

  const handleOpenCarouselDeleteModal = (itemId: string) => {
    // setIsDeleteModalOpen(true);
  };

  // Return the values or functions you want to expose
  return {
    handleEditData,
    handleAddData,
    checkBoxHandler,
    handleOpenCarouselDeleteModal,
  };
};
