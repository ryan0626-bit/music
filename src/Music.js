import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const Music = ({ id, album, artist, songName, image, preview }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} title={album} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {album}
            </Typography>
            <AudioPlayer src={preview} />
            <Typography variant="body2" color="textPrimary" component="p">
              {`Artist name is: ${artist}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Song is: ${songName}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Music;
