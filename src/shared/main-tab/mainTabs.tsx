import { ThemeProvider, Typography, createTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import flag1 from '../../assets/images/isreal.png';
import flag2 from '../../assets/images/usFlag.png';
import styles from './main-tab.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setLanguage } from '../../redux/slices/language';

export const MainTabs: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const customTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            display: 'none',
          },
        },
      },
    },
  });

  const handleLanguage = (language: any) => {
    // alert("Active Language is = " + language)
    dispatch(setLanguage(language));
  };
  const isLanguageSelected = (language: string) => currentLanguage === language;
  return (
    <ThemeProvider theme={customTheme}>
      <Tabs value={0} className={styles.tabWrapper}>
        <Tab
          className={`${styles.tabCustom} ${
            isLanguageSelected('HE') ? styles.activeTab : ''
          }`}
          onClick={() => handleLanguage('HE')}
          label={
            <div className={styles.d_vCenter}>
              <Typography variant="body1">עִברִית</Typography>
              <img src={flag1} alt="flag" className={styles.tabIcon} />
            </div>
          }
        />

        <Tab
          className={`${styles.tabCustom} ${
            isLanguageSelected('EN') ? styles.activeTab : ''
          }`}
          onClick={() => handleLanguage('EN')}
          label={
            <div className={styles.d_vCenter}>
              <Typography variant="body1">אנגלית</Typography>
              <img src={flag2} alt="flag" className={styles.tabIcon} />
            </div>
          }
        />
      </Tabs>
    </ThemeProvider>
  );
};
