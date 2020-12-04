import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles, Container} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({

}))

function SimpleDialog(props, {desaparecidos}) {
    // {desaparecidos.nombre}
    const array = [desaparecidos]
    const [desaparecido] = array
    // console.log(desaparecido)

    // console.log({desaparecidos})
    // const array = [desaparecidos]
    // const [desaparecido] = array 
    // console.log
    // console.log(desaparecidos)
  
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Container className={classes.container}>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent>
          {/* {desaparecido.nombre}    */}
        </DialogContent>
      </Dialog>
      </Container>
    );
  }

export default SimpleDialog