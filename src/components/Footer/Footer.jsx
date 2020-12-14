import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {db} from '../firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Federico Leiva
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '70vh',
    justifyContent: 'center',

    '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '25ch',
      },
      [theme.breakpoints.up('md')] : {
        minHeight: '60vh',
    }
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
    theme.palette.type === 'black' ? theme.palette.grey[100] : theme.palette.grey[800],
    color: 'white',
  },
  containerFooter: {
      width: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      [theme.breakpoints.up('md')] : {
        flexDirection: 'row',
    }
  },
  containerContacto: {
      marginTop: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')] : {
        borderRight: '2px solid gray',
        margin: '30px 0 30px 0',
      },
      "&:hover": {
        color: 'white',
        transition: 'color .5s',
      }
  },
  iconoContacto: {
      marginRight: '5px',

  },

  containerRedSocial: {
      width: '100%',
    //   backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'center',
      color: 'gray',
      "&:hover": {
        color: 'white',
        transition: 'color .5s',
      }
  },
  tField: {
      color: 'white',
  },
  containerCopy: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '12px',
      alignItems: 'center',
      borderTop: '2px solid gray',

    },
    containerNewsletter: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerEmail: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonEnviarEmail: {
      color: 'white'
    },
    contactoLink: {
      textDecoration: 'none',
      color: 'gray',
      "&:hover": {
        color: 'white',
        transition: 'color .5s',
      }
    }

}));

export default function StickyFooter() {
  const classes = useStyles();
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e) =>{
    setEmail(e.target.value)
  }

  const subirEmail = async (e) => {
    e.preventDefault();
    db.collection('newsletter').add({
        emailUsuario: email,     
    })
    setTimeout((function(){ window.location.replace("/"); }), 1000)
  }

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container className= {classes.containerFooter}>

            <Container className={classes.containerContacto}>
                <Typography>Redes sociales</Typography>

                <Container className={classes.containerRedSocial}>
                    <FacebookIcon className={classes.iconoContacto} />
                    <a href="https://www.facebook.com/" target="_blank" className={classes.contactoLink}>Facebook</a>
                </Container>

                <Container className={classes.containerRedSocial}>
                    <InstagramIcon className={classes.iconoContacto} />
                    <a href="https://www.instagram.com/" target="_blank" className={classes.contactoLink}>Instagram</a>
                </Container>
            </Container>

            <Container className={classes.containerContacto}>
                <Typography>Contacto</Typography>
                <Container className={classes.containerRedSocial}>
                    <PhoneIcon className={classes.iconoContacto} />
                    <a href="tel:1141234123" target="_blank" className={classes.contactoLink}>(11) 4123-4123</a>
                </Container>

                <Container className={classes.containerRedSocial}>
                    <MailOutlineIcon className={classes.iconoContacto} />
                    <a href="mailto:findyou@info.com" target="_blank" className={classes.contactoLink}>findyou@info.com</a>
                </Container>
            </Container>

            <Container className={classes.containerNewsletter}>
                <Typography>Suscribite a nuestro Newsletter</Typography>
                  <form onSubmit={subirEmail}>
                <Container className={classes.containerEmail}>
                    <TextField
                    className={classes.tField}
                    id="outlined-uncontrolled"
                    label="Email"   
                    variant="outlined"
                    color="secondary"
                    onChange={handleChangeEmail}
                    type="email"
                    required
                    />
                    <Button type="submit" className={classes.buttonEnviarEmail}>Enviar</Button>
                </Container>
                    </form>
            </Container>

            {/* <Typography variant="900">Proyecto para ComunidadIT</Typography> */}
        </Container>
        
        <Container className={classes.containerCopy}>
            <Copyright/>
        </Container>
      </footer>
    </div>
  );
}