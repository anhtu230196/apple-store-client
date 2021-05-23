
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { currentUser } from './services/auth'
import { LoadingOutlined } from '@ant-design/icons';

const Login = lazy(() => import('./pages/Auth/Login'))
const Header = lazy(() => import('./components/nav/Header'))
const Home = lazy(() => import('./pages/Home'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const RegisterComplete = lazy(() => import('./pages/Auth/RegisterComplete'));
const History = lazy(() => import('./pages/User/History'));
const UserRoute = lazy(() => import('./components/routers/UserRoute'));
const Wishlist = lazy(() => import('./pages/User/Wishlist'));
const Password = lazy(() => import('./pages/User/Password'));
const AdminRoute = lazy(() => import('./components/routers/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const CategoryCreate = lazy(() => import('./pages/Admin/Category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/Admin/Category/CategoryUpdate'));
const SubCreate = lazy(() => import('./pages/Admin/Sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/Admin/Sub/SubUpdate'));
const ProductCreate = lazy(() => import('./pages/Admin/Product/ProductCreate'));
const AllProducts = lazy(() => import('./pages/Admin/Product/AllProducts'));
const ProductUpdate = lazy(() => import('./pages/Admin/Product/ProductUpdate'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CategoryHome = lazy(() => import('./pages/Category/CategoryHome'));
const SubHome = lazy(() => import('./pages/Sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCoupon = lazy(() => import('./pages/Admin/Coupon/CreateCoupon'));
const Payment = lazy(() => import('./pages/Payment'));

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
          .then(res => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id
              }
            })
          })
          .catch((err) => console.log(err));
      }
    })
    return () => unsubscribe()
  }, [dispatch])
  return (
    <Suspense fallback={
      <div className="col text-center p-5">
        <LoadingOutlined />
      </div>
    }>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <SideDrawer />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" exact component={RegisterComplete} />
          <Route path="/forgot/password" component={ForgotPassword} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/category/:category/:slug" exact component={SubHome} />
          <Route path="/category/:slug" component={CategoryHome} />
          <Route path="/shop" component={Shop} />
          <Route path="/cart" component={Cart} />

          <UserRoute path="/user/history" component={History} />
          <UserRoute path="/user/wishlist" component={Wishlist} />
          <UserRoute path="/user/password" component={Password} />
          <UserRoute path="/checkout" component={Checkout} />
          <UserRoute path="/payment" component={Payment} />

          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/category/:slug" component={CategoryUpdate} />
          <AdminRoute path="/admin/category" component={CategoryCreate} />
          <AdminRoute path="/admin/sub/:slug" component={SubUpdate} />
          <AdminRoute path="/admin/sub" component={SubCreate} />
          <AdminRoute path="/admin/product/:slug" component={ProductUpdate} />
          <AdminRoute path="/admin/product" component={ProductCreate} />
          <AdminRoute exact path="/admin/products" component={AllProducts} />
          <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
