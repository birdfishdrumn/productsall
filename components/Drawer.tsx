import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MoneyIcon from '@material-ui/icons/Money'
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import { toast } from "react-toastify"
import { useAllPost } from 'fooks/getPost'
import ProductCard from "components/ProductCard"

const drawerWidth = 280

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,

    },
  }),
);


export default function PersistentDrawerRight(props) {
  const { orders, setOrders, open, setOpen, handleDrawerOpen, handleChange } = props
    const { posts } = useAllPost()

  const classes = useStyles()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const price = orders.map((order) => order.price)
  const idArray = orders.map((order) => order.id)

  console.log(price)

  const result =
    price.length &&
    price.reduce(function (a, b, index, arr) {
      return a + b
    })

  const submitOrder = async () => {
    orders.forEach(async (order) => {
      setIsLoading(true)
      const data = await {
        name: order.name,
        price: order.price,
        image: order.image.url,
      }
      console.log(data)

      await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/v2/orders`, data).then((res) => {
        setIsLoading(false)
        setOrders([])
        toast.success("商品の購入が完了しました！")

        console.log(res)
      })
    })
  }

  const handleDelete = async (id: string) => {
    // console.log(idArray)
    const removeId = idArray.filter(function (i) {
      return i != id
    })
    setOrders(
      orders.filter(function (order) {
        return order.id != id
      })
    )
  }

  console.log(result)
  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>


      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {posts.length &&
            posts.map((post) => (
              <ProductCard post={post} handleChange={handleChange}/>
            ))}
        </div>
      </div>

     </main>


      <Drawer
     className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >


        <Divider />
        <List>
          {orders.length ? (
            orders.map((order) => (
              <>
                <ListItem>
                  <ListItemIcon onClick={() => handleDelete(order.id)}>
                    <DeleteIcon />
                  </ListItemIcon>
                  <img className="my-2 mr-2 w-24" src={order.image.url} />
                  <div className="w-32">
                    <p>{order.name}</p>
                    <ListItemText className="text-red-400 " primary={`¥${order.price}`} />
                  </div>
                </ListItem>
                <Divider />
              </>
            ))
          ) : (
            <p className="text-gray-400 text-center my-4 text-sm">買い物かごに商品がありません。</p>
          )}
        </List>

        <List>
          <ListItem>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText className="mx-8" primary="合計" />
            <ListItemText className="mx-6 text-red-400" primary={`¥${result}`} />
          </ListItem>
        </List>
        <button
          onClick={() => submitOrder()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 mb-32"
        >
          {isLoading ? 'Loading...' : '購入する'}
        </button>
      </Drawer>
    </div>
  )
}
