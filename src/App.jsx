import { useState } from "react"
import {
  Box,
  Typography,
  Divider,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import FileUpload from "./components/FileUpload"
import FlashcardList from "./components/FlashcardList"
import FlashcardControls from "./components/FlashcardControls"

// Create a custom theme with youthful and refreshing colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4", // Bright teal/cyan - fresh and modern
    },
    secondary: {
      main: "#ff9800", // Warm orange - energetic and youthful
    },
    background: {
      default: "#f8fbfd", // Very light blue tint - airy and clean
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
  },
})

const App = () => {
  const [flashcards, setFlashcards] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleUpload = (fileName, content) => {
    setUploadedFiles((prev) => [...prev, { name: fileName, content }])
  }

  const handleGenerate = (generatedFlashcards) => {
    setFlashcards(generatedFlashcards)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            minHeight: "100vh",
            pt: 4,
            pb: 8,
            boxSizing: "border-box",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              width: "100%",
              background: "linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)",
              color: "white",
              textAlign: "center",
              borderRadius: "16px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <AutoFixHighIcon
                sx={{ fontSize: 32, transform: "rotate(30deg)", filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}
              />
              Flashcard Generator
            </Typography>
            <Typography variant="body1">
              Upload a PDF and create customized flashcards for effective studying
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "100%",
              mb: 4,
              maxWidth: isMobile ? "100%" : "800px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Step 1: Upload Your Document
              </Typography>
              <FileUpload onUpload={handleUpload} />

              <Divider sx={{ width: "100%", my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Step 2: Generate Flashcards
              </Typography>
              <FlashcardControls onGenerate={handleGenerate} />
            </Box>
          </Paper>

          {flashcards.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                p: 4,
                width: "100%",
                maxWidth: isMobile ? "100%" : "800px",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 500, textAlign: "center" }}>
                Your Flashcards
              </Typography>
              <FlashcardList flashcards={flashcards} />
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App

