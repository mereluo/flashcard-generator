"use client"

import { useState } from "react"
import { Button, Typography, Box, Paper, Alert } from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import FileIcon from "@mui/icons-material/InsertDriveFile"

const FileUpload = ({ onUpload }) => {
  const [pdfFile, setPdfFile] = useState(null)
  const [error, setError] = useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setError("")

    if (file) {
      if (file.type === "application/pdf") {
        setPdfFile(file)
      } else {
        setError("Invalid file type. Please upload a PDF file.")
      }
    }
  }

  const handleUpload = () => {
    if (!pdfFile) {
      setError("Please upload a PDF file")
      return
    }

    // PDF file is passed as File object
    onUpload(pdfFile.name, pdfFile)
  }

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500, minWidth: "200px" }}>
          Upload PDF for new flashcards
        </Typography>

        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          component="label"
          fullWidth
          sx={{
            height: "48px",
            borderColor: pdfFile ? "primary.main" : "grey.300",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          }}
        >
          {pdfFile ? "Change PDF" : "Choose PDF"}
          <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
        </Button>
      </Box>

      {pdfFile && (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            backgroundColor: "rgba(63, 81, 181, 0.05)",
          }}
        >
          <FileIcon color="primary" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {pdfFile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
            {(pdfFile.size / 1024).toFixed(1)} KB
          </Typography>
        </Paper>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!pdfFile}
        fullWidth
        sx={{
          height: "48px",
          mt: 1,
        }}
      >
        Upload File
      </Button>
    </Box>
  )
}

export default FileUpload

