import "../../styles/globals.css"
import { Toaster } from 'react-hot-toast';
import AuthProvider from "@/context/AuthContext";
import { ThemeProvider } from "@mui/material";
import { appWithTranslation } from "next-i18next";
import Appbar from "@/components/appbar";
import { UIProvider } from "@/context/ui"
import AppDrawer from "@/components/drawer";
import "../../styles/globals.css"
import { LibraryProvider } from "@/context/LibraryContext";
import { CollectionProvider } from "@/context/CollectionContext";
import { ItemProvider } from "@/context/ItemContext";
import { CssBaseline } from '@mui/material';
import { createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { lighten } from "polished";
import { Colors } from "styles/theme";
import { MainContainer } from "styles/body";
import { AttachmentProvider } from "@/context/AttachmentContext";
import { Provider } from "react-redux";

import store from "../../store/index"

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary)
          }
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: lighten(0.05, Colors.secondary)
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `1px solid ${Colors.secondary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true
      }
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary)
          }
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: lighten(0.05, Colors.secondary)
          }
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: "0px 100px 0px 0px",
          borderRight: `1px solid ${Colors.secondary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    }
  }
})

function MyApp({ Component, pageProps }) {

  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkTheme");
    const parsedDarkMode = storedDarkMode === "true"; // Convert the string to a boolean
    setDarkMode(parsedDarkMode);
  }, []);

  const toggleTheme = () => {
    localStorage.setItem("darkTheme", !darkMode);
    setDarkMode(!darkMode);
  }

  return <AuthProvider>
    <Provider store={store}>
      <LibraryProvider>
        <CollectionProvider>
          <ItemProvider>
            <AttachmentProvider>
              <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <CssBaseline />
                <MainContainer>
                  <UIProvider>
                    <Appbar darkMode={darkMode} toggleTheme={toggleTheme} />
                    <Component {...pageProps} />
                    <AppDrawer darkMode={darkMode} toggleTheme={toggleTheme} />
                    <Toaster />
                  </UIProvider>
                </MainContainer>
              </ThemeProvider>
            </AttachmentProvider>
          </ItemProvider>
        </CollectionProvider>
      </LibraryProvider>
    </Provider>
  </AuthProvider>
}

export default appWithTranslation(MyApp)
