import { useEffect } from "react";
import { Background, Layer1, Layer2, Layer3 } from "../assets/login";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../features/users/LoginForm";
import RegistrationForm from "../features/users/RegistrationForm";
import {
  Button,
  HeroContent,
  Layers,
  LayersContainer,
  LayersItem,
  MainPageWrapper,
} from "./index";
import { Link } from "react-router-dom";

const MainPage = observer(() => {
  const handleMouseMove = (e: MouseEvent) => {
    Object.assign(document.documentElement, {
      style: `
      --move-x: ${(e.clientX - window.innerWidth / 2) * -0.003}deg;
      --move-y: ${(e.clientY - window.innerHeight / 2) * 0.01}deg;
      `,
    });
  };
  const { userStore, modalStore } = useStore();

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <MainPageWrapper>
      <Layers>
        <LayersContainer>
          <LayersItem
            className="layer-1"
            style={{ backgroundImage: `url(${Background})` }}
          ></LayersItem>
          <LayersItem
            className="layer-2"
            style={{ backgroundImage: `url(${Layer1})` }}
          ></LayersItem>
          <LayersItem
            className="layer-3"
            style={{ backgroundImage: `url(${Layer2})` }}
          ></LayersItem>
          <LayersItem className="layer-4">
            <HeroContent>
              <h1>
                Skill<span>WORKSHOP</span>
              </h1>
              <div className="hero-content__p">
                Solving the Skills Puzzle Together
              </div>
              {userStore.isLoggedIn ? (
                <>
                  <h2>Welcome to Skill Workshop</h2>
                  <Link to="/trainings">
                    <Button>Go to workshop</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button onClick={() => modalStore.openModal(<LoginForm />)}>
                    Login
                  </Button>
                  <Button
                    onClick={() => modalStore.openModal(<RegistrationForm />)}
                  >
                    Register
                  </Button>
                </>
              )}
            </HeroContent>
          </LayersItem>
          <LayersItem
            className="layer-5"
            style={{ backgroundImage: `url(${Layer3})` }}
          ></LayersItem>
        </LayersContainer>
      </Layers>
    </MainPageWrapper>
  );
});

export default MainPage;
