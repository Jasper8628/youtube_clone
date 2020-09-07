import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        marginBottom: "30px",
    },
    cardActionArea: {
        display: "flex",
        maxWidth: "80%",
        maxHeight:"140px",
        justifyContent:"start",
        marginBottom:"10px"
    },
    cardActionAreaHome:{
       width:"340px",
    },
    cardMedia: {
        objectFit: "contain",
        height: "138px",
        width: "246px",
    },
    cardMediaHome:{
        objectFit: "contain",
        height: "180px",
        width: "320px",
    },
    videoTitle: {
        color: "black",
    },
    typography:{
        WebkitBoxLines:2,
        WebkitBoxOrient:"vertical",
        textOverflow: "ellipsis",
        display: "block",
        overflow:"hidden",
    },
    cardContent:{
        display:"block"
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
                <Link href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
                    <CardMedia
                        className={isHome?classes.cardMediaHome: classes.cardMedia}
                        component="img"
                        alt=""
                        height="220"
                        image={image}
                    />
                </Link>
                <CardContent>
                    <Typography className="videoRow__text" gutterBottom variant="h5" component="h2">
                        <Link
                            underline="none"
                            className={classes.videoTitle}
                            href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
                            {title}
                        </Link>
                    </Typography>
                    <Typography className={classes.typography}>
                        {channel}
                    </Typography>
                    <Typography className="videoRow__description" variant="body2" color="textSecondary" component="p">
                        {description} .{subs}.{views}.{(numDays < 1) ? `${numHours} hours` : `${numDays} days`} ago
                    </Typography>
                </CardContent>
            </CardActionArea>
     
    );
}
