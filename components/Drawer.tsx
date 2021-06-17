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
import CircularProgress from '@material-ui/core/CircularProgress';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import order from 'pages/order'

let  drawerWidth = "100%"
// if (window.matchMedia("(max-width: 400px)").matches) {
//  drawerWidth = 280
// } else {
//    drawerWidth = 100
// }


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {

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
      width:"100%",
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      marginBottom:"150px"

    },
  }),
);


export default function PersistentDrawerRight(props) {
  const { orders, setOrders, handleChange } = props
    const { posts } = useAllPost()
const [open, setOpen] = useState(false);
  const classes = useStyles()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDrawerClose = () => {
    setOpen(false)
  }
    const handleDrawerOpen = () => {
    setOpen(!open);
  };


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
      <IconButton className="fixed top-4 right-4 z-50" onClick={()=>handleDrawerOpen()}>
          <Badge badgeContent={orders.length} color="primary" >

                    <ShoppingCartIcon  style={{fontSize:"40px"}}/>
                  </Badge>
                  </IconButton>

      <main className={classes.content}>

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {posts.length ?
            posts.map((post) => (
              <ProductCard post={post} handleChange={handleChange}/>
            ))
              :
                <div className="text-gray-400 text-center m-8 text-lg mx-auto ">
            <CircularProgress />
          </div>
          }
        </div>
      </div>

     </main>


      <Drawer
    //  className={classes.drawer}
          open={open}
             variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="bottom"
      >

 <div className="flex items-center justify-center">

                <div className="grid gap-1 grid-cols-4  lg:grid-cols-6 xl:grid-cols-8">
          {orders.length ? (
            orders.map((order) => (


                <div className="pb-2  m-1  py-1 px-0 h-full">
                  <div className="flex justify-between">

                    <p className="text-md font-semibold text-red-400 ">¥{order.price}</p>
                </div>
                <div className="relative">
                      <img src={order.image.url} className="mx-auto mt-2 ob object-cover w-16" />
                           <IconButton onClick={() => handleDelete(order.id)} className="absolute bottom-0  right-0">
                    <DeleteIcon />
                  </IconButton>
                </div>

                        <p className="text-md text-gray-500  sm:text-xs  md:text-xs lg:text-xs">{order.name}</p>


                </div>

            ))
            )
              :
              <></>
        }
               </div>
        </div>
        {orders.length === 0 &&
            <p className="text-gray-400 text-center my-4 text-sm">買い物かごに商品がありません。</p>
        }


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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 mb-2"
        >
          {isLoading ? 'Loading...' : '購入する'}
        </button>
      </Drawer>
    </div>
  )
}
