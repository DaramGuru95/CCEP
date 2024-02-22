import {
  Box,
  Checkbox,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useState } from "react";

const AddAttechment = () => {
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const imageList = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
      alt: "Image 3",
    },
    // Add more images as needed
  ];

  return (
    <Box
      sx={{
        borderRadius: 2,
        background: "#ffffff",
        paddingLeft: 1,
        display: "flex",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "150px",
          borderRight: "1px solid #e6e9ea",
        }}
      >
        <ImageList cols={2} rowHeight={120}>
          {imageList.map((image) => (
            <ImageListItem key={image.id}>
              <Checkbox
                onChange={() => handleImageClick(image)}
                checked={
                  selectedImage && selectedImage.id === image.id ? true : false
                }
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />

              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "100%" }}
                onClick={() => handleImageClick(image)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Box sx={{ flex: 1, paddingLeft: 2 }}>
        <Box paddingBottom={1}>
          <Box sx={{ display: "flex", marginBottom: "1em" }}>
            {selectedImage && (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddAttechment;
