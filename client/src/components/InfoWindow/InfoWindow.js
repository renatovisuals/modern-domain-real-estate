import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 500,
    width:250
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function InfoWindow(props) {
  const { classes, marker, data } = props;
  const infoWindowData = data.filter((house)=>{
    return house.listing_id === marker.id;
  })

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`/images/listings/${marker.id}/1.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            {`$${infoWindowData[0].price}`}
          </Typography>
          <Typography component="p">
            {infoWindowData[0].formatted_address}
          </Typography>
          <Typography component="p">
            {`${infoWindowData[0].bedrooms} bd, ${infoWindowData[0].bathrooms} ba, ${infoWindowData[0].sqft} sqft`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick = {props.viewListing}>
            View Listing
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default withStyles(styles)(InfoWindow);
