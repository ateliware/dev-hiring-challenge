import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  home: {
    marginRight: 50
    //marginLeft: theme.spacing(2)
  },
  newPost: {
    marginRight: 50
  },
  title: {
    flexGrow: 1,
  },

});

class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { classes } = this.props;
    return (
      <div >
        <AppBar position="static" style={{ background: '#ef0044' }}>
          <Toolbar>
            <img
              src="https://media.glassdoor.com/sql/2617805/ateliware-squarelogo-1568813458428.png"
              alt="new"
              width="70" height="70"
            />
            <Typography variant="h6" className={classes.title} color="inherit">
              Ateliware
            </Typography>
            <Button component={Link}
              to="/" variant="outlined"
              className={classes.home}
              color="primary"
              style={{ color: '#FFFFFF' }}>
              Home
          </Button>

            <Button component={Link}
              to="/favorites"
              variant="outlined"
              className={classes.newPost}
              color="primary"
              style={{ color: '#FFFFFF' }}>
              Favorites
          </Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);