import { observer } from "mobx-react-lite";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import LoadingComponent from "../components/loader/LoadingComponent";
import ModalContainer from "../components/common/modals/ModalContainer";
import NavBar from "./navbar/NavBar";
import { useStore } from "../stores/store";
import MainPage from "../pages/MainPage";
import AppContainer from ".";
import "semantic-ui-css/semantic.min.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded()); //turning off a loading flag
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  //Adding loading spinner
  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app.." />;

  return (
    <>
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <MainPage />
      ) : (
        <>
          <NavBar />
          <AppContainer>
            <Outlet />
          </AppContainer>
        </>
      )}
    </>
  );
}

export default observer(App);
