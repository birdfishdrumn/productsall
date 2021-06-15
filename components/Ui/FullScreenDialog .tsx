import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import { dialogState, idState } from 'store/store'
import { atom, useRecoilState } from 'recoil'
import PostForm from 'components/PostForm'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'relative',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  dialog: {
    margin: 0,
  },
}))

interface Props {
  id?: string
}

const FullScreenDialog = () => {
  const classes = useStyles()
  const [open, setOpen] = useRecoilState(dialogState)
  const [id, setId] = useRecoilState(idState)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClose = (): void => {
    setOpen(false)
    setId('')
  }
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* <DialogTitle id="form-dialog-title" className="center">{title}</DialogTitle> */}
        <DialogContent>
          <PostForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FullScreenDialog
