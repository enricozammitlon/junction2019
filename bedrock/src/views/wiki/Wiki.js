import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Wiki() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>

    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="What is a fund?"
        subheader="Nov 17, 2019"
      />
      <CardMedia
        className={classes.media}
        image="/fund.png"
        title="Fund"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         Funds offer an easy and convenient way to invest and are popular with people new to investing (like you). They offer an easy way of spreading your savings onto a variety of investments (like stocks and gold), and access to the skills of a professional fund manager.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph></Typography>
          <Typography paragraph>
            A fund pools together the money of lots of different investors, and a fund manager invests on their behalf. Funds can invest in various types of asset, such as shares, commodities or property, depending on the investment objective of the fund. An example distribution of money in a fund is seen in the image above. 
          </Typography>
          <Typography paragraph>
            With a professional making the investment decisions, investing in funds takes away much of the pressure of choosing and managing your own investments.
          </Typography>
          <Typography paragraph>
            A fund manager will decide what to specifically invest in, but usually, each fund is in a particular sector and region (e.g. health in the US). This means you can pick funds that better suit your personal beliefs.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

    </div>

  );
}
