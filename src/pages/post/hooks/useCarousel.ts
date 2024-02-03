import { HeroCard, PostCard } from "../../../interfaces";
import { useUploadSomeDataMutation } from "../../../redux/slices/home";

// Define the type for the custom hook's props (if any)
interface UseCarouselProps {
  // Define your props here
  isRandomOrderActive: boolean;
  setRandomOrderActive: (val: boolean) => void;
  setCarousalData: (val: any) => void;
}

// Define the return type of the custom hook
interface UseCarouselReturn {
  handleEditData: (updatedData: HeroCard) => void;
  handleAddData: (newData: PostCard) => void;
  checkBoxHandler: () => void;
}

// Define the custom hook function
export const useCarousel = (props: UseCarouselProps): UseCarouselReturn => {
  const { setRandomOrderActive, setCarousalData, isRandomOrderActive } = props;
  const [uploadSomeData] = useUploadSomeDataMutation();

  const handleEditData = (updatedData: HeroCard) => {
    setCarousalData((prevData: HeroCard[]) =>
      prevData.map((item) =>
        item.id === updatedData?.id ? updatedData : item,
      ),
    );
  };

  const handleAddData = (newData: PostCard) => {
    console.log({ newData });
    setCarousalData((prevData: HeroCard[]) => [...prevData, newData]);
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

  // Return the values or functions you want to expose
  return {
    handleEditData,
    handleAddData,
    checkBoxHandler,
  };
};
