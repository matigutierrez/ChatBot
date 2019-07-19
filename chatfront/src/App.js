import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  icon: {
    fontSize: 40,
  },
  input: {
    padding: 10
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    height: 500,
    width: 450,
    marginTop: 150
  },
  margin: {
    margin: theme.spacing(1),
  },
  chat: {
    height: '100%'
  },
  avatar: {
    margin: 10,
  },
  buton: {
    marginLeft: 25
  }
});

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      text: '',
      messages: []
    };
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClick(text) {

    this.setState({
      text: ''
    })
    
    this.state.messages.push({"author": "yo", "message": text});
    this.setState(this.state)

    const formData = new FormData();
    formData.append('msg', text);
      
    axios({
      method: 'post',
      url: 'http://localhost:5000/bot',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then((response) => {

        this.state.messages.push(response.data);
        this.setState(
          this.state
        )
        
      })

  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <img src="https://scontent.fpmc2-1.fna.fbcdn.net/v/t1.15752-9/65636508_2294036844019808_5580913678749794304_n.png?_nc_cat=110&_nc_oc=AQnBNcmLtn2VOBaE1Vp0aCy2jQZbDtNqCWE-shaKJZ2W6c2qDoqRlhdJJRMfc-Qyq9M&_nc_ht=scontent.fpmc2-1.fna&oh=4d9f629de054c44e00bb995f03a91a55&oe=5DBB2324" alt="Mountains" width="100" height="50"/>
            <Button className={classes.buton} color="inherit">
              <Typography variant="h6" gutterBottom>
                Departamento
              </Typography>
            </Button>
            <Button className={classes.buton} color="inherit">
              <Typography variant="h6" gutterBottom>
                Nosotros
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={7}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Typography variant="h1" gutterBottom>
                ¿Que quieres saber del DCI?
              </Typography>
              <Typography variant="h5" gutterBottom>
                DCIBOT responderá cualquier duda que tengas del Departamento de Computación e Informática
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Card className={classes.paper}>
                <Grid container className={classes.chat} direction="column" justify="flex-end" alignItems="center">
                  <Grid container direction="column">
                    {this.state.messages.map(msg => (
                      <div>
                        {msg.author === "yo" ?
                          (
                            <Grid container direction="row" justify="flex-end" alignItems="center">
                              <label>{msg.message}</label>
                              <Avatar alt="Remy Sharp" src="https://scontent.fpmc2-1.fna.fbcdn.net/v/t1.0-9/56285191_2099818550105540_2972610315113463808_n.jpg?_nc_cat=105&_nc_oc=AQlJhzqG_pOQrm846Gvtmr9hYktOCHqN4ti6T5--yvP35dIoz9ItWnq2pkSAn1onsOA&_nc_ht=scontent.fpmc2-1.fna&oh=b6426381acdc8cf6f72063ce5a3ab804&oe=5D8894DF" className={classes.avatar} />
                            </Grid>
                          ) : (
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                              <Avatar alt="Remy Sharp" src="https://scontent.fpmc2-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/65542080_639761033207967_3622974612628832256_n.png?_nc_cat=103&_nc_oc=AQmUp06_D2bvqmjILMAVMd609D8b_mOe2xm2ZNyGAW1u1ktPYZJh_VEejzBPTHbxkg8&_nc_ht=scontent.fpmc2-1.fna&oh=94bfde2f81a3305f1d755f90a75baaf3&oe=5D8BDC59" className={classes.avatar} />
                              <label>{msg.message}</label>
                            </Grid>
                          )
                        }
                      </div>
                    ))}
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="flex-end">
                    <Grid item xs={11}>
                      <TextField className={classes.height}
                        id="outlined-bare"
                        placeholder="Pregunta algo al DCIBOT"
                        fullWidth
                        onChange={this.handleChange('text')}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="Delete" className={classes.margin} size="small" onClick={() => {
                        this.handleClick(this.state.text);
          
                      }}>
                        <Send className={classes.icon}/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
