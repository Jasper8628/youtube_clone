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
        marginBottom: "30px",
    },
    cardActionArea: {
        display: "flex",
        maxWidth: "70%",
        justifyContent:"start",
    },
    cardActionAreaHome:{
       width:"300px",
    },
    cardMedia: {
        objectFit: "contain",
        height: "138px",
        width: "246px",
    },
    videoTitle: {
        color: "black",
    }
});

export default function ImgMediaCard({ isHome,id, views, subs, description, title, image, timestamp, channel }) {
    const classes = useStyles();
    const today = new Date();
    const publishedAt = new Date(timestamp);
    const numHours = Math.floor(Math.abs(today - publishedAt) / 36e5);
    const numDays = Math.floor(numHours / 24);

    return (
        // isHome is used to check whether component is display on Home page or Search page, 
        // display rules change accordingly
            <CardActionArea className={isHome? classes.cardActionAreaHome:classes.cardActionArea}>
                <Link href={`https://www.youtube.com/watch?v=${id}`}>
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt=""
                        height="220"
                        image={image}
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        <Link
                            underline="none"
                            className={classes.videoTitle}
                            href={`https://www.youtube.com/watch?v=${id}`}>
                            {title}
                        </Link>
                    </Typography>
                    <Typography>
                        {channel}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description} .{subs}.{views}.{(numDays < 1) ? `${numHours} hours` : `${numDays} days`} ago
                    </Typography>
                </CardContent>
            </CardActionArea>
     
    );
}
