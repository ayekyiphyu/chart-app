import { FC } from "react";
import LoginPage from "../components/login/useLogin";

const HomePage: FC = () => {
  return (
    <div className="flex justify-center mt-[10.5rem]">
      <LoginPage />
    </div>
  );
};

export default HomePage;
