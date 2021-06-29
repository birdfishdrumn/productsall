import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch';
import { confirmDialogState, idState,orderState } from 'store/store'
import { atom, useRecoilState } from 'recoil'
import OrderItem from "components/OrderItem"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }),
);

export default function MaxWidthDialog() {
  const classes = useStyles();
   const [open, setOpen] = useRecoilState(confirmDialogState)
  const [orders, setOrders] = useRecoilState(orderState)
    const [number, setNumber] = useState<any>(0)
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xl');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOrders([])
  };

  const handleMaxWidthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMaxWidth(event.target.value as DialogProps['maxWidth']);
  };

  const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked);
  };


  const price: number[] = orders.map((order) => order.price)
    const result: number =
    price.length &&
    price.reduce(function (a, b, index, arr) {
      return a + b
    })

  return (
    <React.Fragment>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">ご注文の完了</DialogTitle>
        <DialogContent>
           <div className="flex items-center justify-center">

                <div className="grid gap-1 grid-cols-4  lg:grid-cols-6 xl:grid-cols-8">
          {orders.map((order) => (
            <OrderItem order={order}/>
          ))}
              </div>
          </div>
          <h1 className="text-6xl px-4 py-2  bg-indigo-100 text-red-400 font-semibold  text-center">¥{result.toLocaleString()}</h1>



        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
