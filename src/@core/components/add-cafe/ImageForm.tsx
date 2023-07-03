/* eslint-disable @next/next/no-img-element */
// ** Components import
import { Box, Typography, Grid } from "@mui/material";

// ** Hooks import
import { useState } from "react";

// ** Icons import
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface IProps {
  uploadFiles: any;
  handlePropsImage: any;
}

export default function ImageForm(props: IProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray = [...props.uploadFiles];
    if (files) {
      const previewArray = Array.from(files).map((file) => {
        filesArray.push(file);
        return URL.createObjectURL(file);
      });
      setPreviewImages(previewArray);
      props.handlePropsImage(filesArray);
      // Handle the image field change here
    }
  };

  return (
    <Box
      sx={{
        marginLeft: 4,
        borderRadius: "5px",
        width: "40%",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: "5px",
          width: "100%",
          padding: "16px 24px",
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700, my: 1 }}>
          写真
        </Typography>
        <Grid container spacing={2} width={"calc(100%)"}>
          {previewImages.map((previewImage) => (
            <Grid item key={previewImage} sm={4} md={4} lg={4} xl={4}>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  border: "1px solid black",
                  borderRadius: "10px",
                  aspectRatio: "1 / 1",
                }}
              />
            </Grid>
          ))}
          <Grid item sm={4} md={4} lg={4} xl={4}>
            <Box
              sx={{
                border: "1px solid black",
                padding: "0px",
                aspectRatio: "1 / 1",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              <label
                htmlFor="image-upload"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AddOutlinedIcon sx={{ fontSize: 60 }} />
              </label>
              <input
                id="image-upload"
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
                width="100%"
                height="100%"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
