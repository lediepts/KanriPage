import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

interface Props {
  title: string;
  children?: React.ReactNode;
  handleClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
}

export default function MainCard({ children, title, handleClick }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            {title}
          </Typography>
          {children || (
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary" onClick={handleClick}>
          More...
        </Button>
      </CardActions>
    </Card>
  );
}
