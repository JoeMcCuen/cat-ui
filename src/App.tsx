import { useEffect, useState } from "react";
import "./App.css";
import { Alert, Backdrop, CircularProgress, Grid } from "@mui/material";
import CatDisplay from "./components/CatDisplay";
import catPicture from "./interfaces/api-interfaces";

/**
 * A simple React App that processes picture data from a cat API and
 * displays it to the user.
 * @returns a React App.
 */
const App = () => {
  const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
  let [catPictures, setCatPictures] = useState<catPicture[]>([]);
  let [loading, setLoading] = useState<boolean>(true);
  let [errorLoading, setErrorLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(CAT_API_URL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLoading(false);
        setCatPictures(response);
      })
      .catch((error) => {
        setLoading(false);
        setErrorLoading(true);
        console.error(error);
      });
  }, []);

  // If there is an error fetching the API data show an error alert.
  // To cause this to happen, go to the network tab in the browser, click on the
  // the request to the cat API, right-click, and click "Block request URL".
  if (errorLoading) {
    return (
      <Alert variant="filled" severity="error">
        Could not load Cat photos! Try refreshing the page.
      </Alert>
    );
  }

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          {loading ? (
            <Backdrop open={loading}>
              <CircularProgress />
            </Backdrop>
          ) : (
            <CatDisplay catPictures={catPictures} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
