import React, { useCallback, useState, useEffect } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import CancelIcon from '@material-ui/icons/Cancel'
import { idState, dialogState, postsState } from 'store/store'
import { useRecoilValue, useRecoilState } from 'recoil'

import { createPost, getPartialPost, updatePost } from '../lib//post'
import { toast } from 'react-toastify'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 320,
    margin: '100px auto',
  },
  inputFileBtn: {
    marginTop: '20px',
  },
  submitBtn: {
    marginTop: '10px',
    marginLeft: 'auto',
  },
  box: {
    margin: '2rem auto 4rem',
    width: 320,
  },
  preview: {
    width: '100%',
  },
}))

const borderStyles = {
  bgcolor: 'background.paper',
  border: 1,
}



const PostForm = () => {
  const classes = useStyles()
  const id = useRecoilValue(idState)

  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<File>()
  const [stock, setStock] = useState<any>(0)
  const [price, setPrice] = useState<any>(0)
  const [preview, setPreview] = useState<string>('')
  const [open, setOpen] = useRecoilState(dialogState)
  const [posts, setPosts] = useRecoilState(postsState)
  const [isLoading,setIsLoading]= useState<boolean>(false)

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  // プレビュー機能
  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  // FormData形式でデータを作成
  const createFormData = (): any => {
    const formData: FormData = new FormData()

    formData.append('name', name)
    formData.append('stock', stock)
    formData.append('price', price)
    if (image) formData.append('image', image)

    return formData
  }

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = createFormData()
    // 編集の場合
    if (id) {
      await updatePost(data, id).then((res) => {
        setPosts(res.data.posts)
        setOpen(false)
        setIsLoading(false)
        toast.success('商品を編集しました！')
      })
      // 新規登録の場合
    } else {
      await createPost(data).then((res) => {
        setPosts(res.data.posts)
        setOpen(false)
         setIsLoading(false)
        toast.success('商品を追加しました！')
      })
    }
  }

  useEffect(() => {
    if (id) {
      getPartialPost(id).then((res) => {
        const data = res.data
        setName(data.name)
         setStock(data.stock)
        setPreview(data.image.url)
        setPrice(data.price)
      })
    }
  }, [id])

  return (
    <>
      <h1 className="text-lg">{id ? '商品の編集' : '商品の登録'}</h1>
      <form className="mx-auto text-center mt-8" noValidate onSubmit={handleCreatePost}>
        <h2 className="m-2">商品名</h2>
        <TextField
          placeholder="商品名"
          variant="outlined"
          multiline
          fullWidth
          type="text"
          rows="4"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
        />
        <h2 className="m-2">値段</h2>
        <TextField
          placeholder="値段"
          variant="outlined"
          multiline
          type="number"
          rows="1"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPrice(e.target.value)
          }}
        />
        <h2 className="m-2">在庫</h2>
        <TextField
          placeholder="在庫"
          variant="outlined"
          multiline
          type="number"
          rows="1"
          value={stock}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStock(e.target.value)
          }}
        />
        <div className={classes.inputFileBtn}>
          <label htmlFor="icon-button-file">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        {preview ? (
          <Box className={classes.box}>
            <IconButton color="inherit" onClick={() => setPreview('')}>
              <CancelIcon />
            </IconButton>
            <img src={preview} alt="preview img" className={classes.preview} />
          </Box>
        ) : null}
        <div className={classes.submitBtn}>

          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!name || name.length > 140}
            className={classes.submitBtn}
          >
            {isLoading ? <CircularProgress size={24}/>:id ? '編集' : '登録' }
          </Button>
        </div>
      </form>
    </>
  )
}

export default PostForm
