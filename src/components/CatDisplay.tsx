import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import catPicture from "../interfaces/api-interfaces";

/**
 * CatDisplay is a component that will take an array of cat pictures, and
 * create Cards displaying their metadata a display of the picture, and
 * a delete button to delete the card.
 * @param catPictures - is an arry of catPictures.
 * @returns a CatDisplay component.
 */
const CatDisplay = ({ catPictures }: { catPictures: catPicture[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [displayedPictures, setDisplayedPictures] =
    useState<catPicture[]>(catPictures);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    let catWithoutSpecificId = displayedPictures.filter((e) => e.id !== id);
    setDisplayedPictures(catWithoutSpecificId);
  };

  if (displayedPictures.length === 0) {
    return <h2>No more cats :(</h2>;
  }

  return (
    <>
      {displayedPictures?.map((picture) => (
        <Card
          className="Cat-card"
          sx={{ minWidth: 275 }}
          key={"card-" + picture.id}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Cat ID: {picture.id}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              From: {picture.url}
            </Typography>
            <Typography variant="body2">
              <img
                alt="Cat being silly"
                key={picture.id}
                src={picture.url}
                height={150}
                width={150}
              />
            </Typography>
            <Typography variant="body2">
              Original Dimensions: {picture.width} x {picture.height}
            </Typography>
          </CardContent>
          <CardActions className="Cat-card-actions">
            <Tooltip title="Delete Cat">
              <IconButton
                size="small"
                onClick={() => {
                  setOpen(true);
                  handleDelete(picture.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Cat Deleted"
      />
    </>
  );
};

export default CatDisplay;
