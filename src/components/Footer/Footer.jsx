import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

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
    minHeight: '100vh',
    justifyContent: 'center',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
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
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')] : {
        borderRight: '2px solid gray',
        margin: '30px 0 30px 0',
      },
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
      // backgroundColor: 'pink',
      
    }

}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container className= {classes.containerFooter}>

            <Container className={classes.containerContacto}>
                <Typography>Redes sociales</Typography>

                <Container className={classes.containerRedSocial}>
                    <FacebookIcon className={classes.iconoContacto} />
                    <Typography>Facebook</Typography>
                </Container>

                <Container className={classes.containerRedSocial}>
                    <InstagramIcon className={classes.iconoContacto} />
                    <Typography>Instagram</Typography>
                </Container>
            </Container>

            

            <Container className={classes.containerContacto}>
                <Typography>Contacto</Typography>

                <Container className={classes.containerRedSocial}>
                    <PhoneIcon className={classes.iconoContacto} />
                    <Typography>(11) 4123-4123</Typography>
                </Container>

                <Container className={classes.containerRedSocial}>
                    <MailOutlineIcon className={classes.iconoContacto} />
                    <Typography>findyou@info.com</Typography>
                </Container>
            </Container>

            <Container className={classes.containerNewsletter}>
                <Typography>Suscribite a nuestro Newsletter</Typography>
                <Container className={classes.containerEmail}>
                    <TextField
                    className={classes.tField}
                    id="outlined-uncontrolled"
                    label="Email"   
                    variant="outlined"
                    color="secondary"
                    />
                    <Button color='secondary'>Enviar</Button>
                </Container>
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