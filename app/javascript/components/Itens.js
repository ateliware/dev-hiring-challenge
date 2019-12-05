import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popup from "reactjs-popup";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        Width: 500,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    root: {
        width: '100%',
        maxWidth: 500,
    },
    pos: {
        marginBottom: 12,
    },
    chip: {
        marginRight: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(5, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
});

class Itens extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { classes } = this.props;
        if (this.props.itens !== undefined) {
            return this.props.itens.map((post) => {
                return (
                    <div className="widget">
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '10vh' }}
                        >
                            <Grid item xs={12}>
                                <div className={classes.root} >
                                    <div className={classes.section1}>
                                        <Grid container alignItems="center">
                                            <Grid item xs>
                                                <img
                                                    src={post.image_url}
                                                    alt="new"
                                                    width="100" height="100"
                                                />
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {post.name}
                                                </Typography>
                                            </Grid>
                                        
                                            <Divider variant="middle" />
                                            <div className={classes.section2}>
                                                <Popup
                                                    trigger={open => (
                                                        <Button className="button" variant="outlined" style={{ color: '#ef0044' }}>Detalhes</Button>
                                                    )}
                                                    position="right center"
                                                    closeOnDocumentClick
                                                >
                                                <ul>
                                                    <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                        user: {post.login_name}
                                                    </Typography></li>
                                                    <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                        stars: {post.stars}
                                                    </Typography></li>
                                                    <li><Typography className={classes.title} variant="subtitle1: 'h6'" color="textSecondary" style={{ color: '#ef0044' }}>
                                                        language: {post.language}
                                                    </Typography></li>
                                                </ul>  
                                                </Popup>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>);
            });
        } else {
            return (
                <div className="widget">
                </div>
            )
        }
    }
}


Itens.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Itens);