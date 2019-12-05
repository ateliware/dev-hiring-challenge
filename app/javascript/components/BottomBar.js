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

const styles = {
    appBar: {
      top: "auto",
      bottom: 0,
      alignItems: 'center',
    },
    menuButton: {
      marginLeft: -12,
      marginRight: -12
    },
    actionButtons: {
      marginLeft: "auto"
    },
    title: {
      flexGrow: 1,
      align: 'center'
    },
  };

  function BottomBar({ classes }) {
    return (
      <React.Fragment>
        <AppBar position="fixed" color="secondary" className={classes.appBar} style={{ background: '#FFFFFF' }}>
          <Toolbar>
            <div className={classes.actionButtons}>
                <Typography variant="h10" className={classes.title} color="inherit" style={{ color: '#ef0044' }}>
                    © 2019 Nader - n-farhat@hotmail.com
                </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar key="spacer" />
      </React.Fragment>
    );
  }
  
  BottomBar.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(BottomBar);