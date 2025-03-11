"use client"

import { useState } from "react"
import { mockFlashcards } from "../data/mockFlashcards"
import {
  MenuItem,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from "@mui/material"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

const FlashcardControls = ({ onGenerate }) => {
  const [selectedType, setSelectedType] = useState("10 Definition Flashcards")
  const [customType, setCustomType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      const key = selectedType.includes("Definition") ? "definitions" : "qna"
      onGenerate(mockFlashcards[key])
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: "rgba(245, 247, 250, 0.5)",
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          Custom Prompt
        </Typography>

        <TextField
          label="Describe what kind of flashcards you want"
          variant="outlined"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          placeholder="Example: Create 10 flashcards about the key concepts of quantum physics with simple explanations"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Paper>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Chip
          label="OR"
          variant="outlined"
          sx={{
            mx: 2,
            px: 1,
            fontWeight: 500,
          }}
        />
        <Divider sx={{ flex: 1 }} />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="flashcard-type-label">Select Flashcard Type</InputLabel>
        <Select
          labelId="flashcard-type-label"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          label="Select Flashcard Type"
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="10 Definition Flashcards">10 Definition Flashcards</MenuItem>
          <MenuItem value="10 Q&A Flashcards">10 Q&A Flashcards</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        fullWidth
        disabled={isGenerating}
        startIcon={<AutoAwesomeIcon />}
        sx={{
          height: "48px",
          fontWeight: 600,
        }}
      >
        {isGenerating ? "Generating..." : "Generate Flashcards"}
      </Button>
    </Box>
  )
}

export default FlashcardControls

