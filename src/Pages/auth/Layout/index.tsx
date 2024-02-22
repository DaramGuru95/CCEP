import { Outlet } from "react-router-dom";
import BankImage from "../../../assets/images/central_bank.png";
export function AuthLayout() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between bg-image">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img src={BankImage} className="w-full" alt="central bank" />
        </div>
        <Outlet />
      </div>
    </main>
  );
}
