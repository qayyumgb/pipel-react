import {
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ReactElement, useState } from "react";
import flag1 from "../../assets/images/isreal.png";
import flag2 from "../../assets/images/usFlag.png";
import styles from "./main-tab.module.scss";
interface maintabsProps {}

export const MainTabs: React.FC<maintabsProps> = ({}) => {
  const [langauage, setLangauage] = useState("HE");
  const customTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: "none",
          },
        },
      },
    },
  });

  const handleLanguage = (event: any) => {
    setLangauage(event);
    console.log(langauage);
  };
  const isLanguageSelected = (language: string) => langauage === language;
  return (
    <ThemeProvider theme={customTheme}>
      <Tabs value={0} className={styles.tabWrapper}>
        <Tab
          className={`${styles.tabCustom} ${
            isLanguageSelected("HE") ? styles.activeTab : ""
          }`}
          onClick={() => handleLanguage("HE")}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">עִברִית</Typography>
              <img src={flag1} alt="flag" className={styles.tabIcon} />
            </div>
          }
        />

        <Tab
          className={`${styles.tabCustom} ${
            isLanguageSelected("EN") ? styles.activeTab : ""
          }`}
          onClick={() => handleLanguage("EN")}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">אנגלית</Typography>
              <img src={flag2} alt="flag" className={styles.tabIcon} />
            </div>
          }
        />
      </Tabs>
    </ThemeProvider>
  );
};
