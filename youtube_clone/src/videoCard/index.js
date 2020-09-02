import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard({ id, views, subs, description, title, image, timestamp, channel }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link href={`https://www.youtube.com/watch?v=${id}`}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="220"
                        image={image}
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Link href={`https://www.youtube.com/watch?v=${id}`}>
                            {title}
                        </Link>
                    </Typography>
                    <Typography>
                        {channel}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description} .{subs}.{views}.{timestamp}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
        </Card>
    );
}
