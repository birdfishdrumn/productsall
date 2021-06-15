import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme } from '@material-ui/core/styles'
import PostForm from 'components/PostForm'
import { getPosts } from 'lib/post'
import { dialogState } from 'store/store'
import { atom, useRecoilState } from 'recoil'
import FullScreenDialog from 'components/Ui/FullScreenDialog '

// import HelpModal from "../Dialog/HelpModal";

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

const FloatingAction: React.FC<Props> = ({ id }) => {
  const classes = useStyles()

  const [open, setOpen] = useRecoilState(dialogState)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const style = {
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 999,
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <div className="sm-only" onClick={handleClickOpen}>
        <Fab variant="extended" style={style as any} color="primary" aria-label="add">
          商品を追加
        </Fab>

        {/*ダイアログ */}
      </div>
    </>
  )
}

export default FloatingAction
