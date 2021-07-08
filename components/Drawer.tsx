import React, { SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'

import IconButton from '@material-ui/core/IconButton'

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
import OrderItem from "components/OrderItem"
import CircularProgress from '@material-ui/core/CircularProgress';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { confirmDialogState, idState } from 'store/store'
import { useRecoilState } from 'recoil'
import {Post} from "types/post"

import order from 'pages/order'

let  drawerWidth = "100%"


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


interface Props {
  orders: Post[]
  setOrders: React.Dispatch<React.SetStateAction<Post[]>>
  handleChange: (any) =>void
}

const PersistentDrawerRight:React.FC<Props> = (props) =>{
  const { orders, setOrders, handleChange } = props
  const { posts } = useAllPost()


  const classes = useStyles()
  const theme = useTheme()
    const [dialogOpen, setDialogOpen] = useRecoilState(confirmDialogState)
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [productPrice, setProductPrice] = useState<number>(0)
  const priceList:number[] = [0,1430,1650,1760,1870,1980,2200,2640,3520]


    const handleDrawerOpen = ():void => {
    setOpen(!open);
  };


  const price:number[] = orders.map((order) => order.price)
  const idArray:string[] = orders.map((order) => order.id)

  console.log(price)

  const result: number =
    price.length &&
    price.reduce(function (a, b) {
      return a + b
    })

  const submitOrder = async ():Promise<void> => {
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
        // setOrders([])

        setDialogOpen(true)

        console.log(res)
      })
    })
  }

  const handleDelete =  (id: string):void => {
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

  const style="text-sm relative flex-none  text-red-400 border-2 border-red-300  w-14 text-center px-2 py-1 mx-1 rounded-xl"

  console.log(result)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <IconButton className="fixed top-4 right-4 z-999" style={{ zIndex: 99999 }} onClick={()=>handleDrawerOpen()}>
          <Badge badgeContent={orders.length} color="primary" >

                    <ShoppingCartIcon  style={{fontSize:"40px"}}/>
                  </Badge>
                  </IconButton>

      <main className={classes.content}>
        <div className="flex overflow-x-auto pb-4 mx-auto my-4">
          {priceList.map(price=>(
 <div onClick={()=>setProductPrice(price)}>
              <div className={style}>

             {price === 0 && "all" || price === 1430 && "台" || price=== 1650 && "体験" || price > 0 && price}
            </div>

          </div>
          ))   }


      </div>


      <div className="flex items-center justify-center">
        <div className="grid grid-cols-4 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {posts.length ?
              productPrice > 0 ?
                         posts.
                 filter(
            (item:Post) =>
              item.price === productPrice
          ).
                map((post) => (
              <ProductCard post={post} handleChange={handleChange}/>
            ))
                :
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

                <div className="grid  grid-cols-5  lg:grid-cols-6 xl:grid-cols-8">
          {orders.length ? (
            orders.map((order) => (
             <OrderItem order={order} handleDelete={handleDelete}/>


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
          {isLoading ? <CircularProgress color="inherit"size={15}/>:"購入する"}
        </button>
      </Drawer>
    </div>
  )
}

export default PersistentDrawerRight
