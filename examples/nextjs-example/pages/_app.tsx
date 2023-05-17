import type { AppProps } from "next/app";
import { AppContext } from "../components/AppContext";

// order matters
import "../styles/global.css";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import Link from "next/link";
import { Button, Tabs, TabsProps } from "antd";
import Home from "./Home";
import CreateEvent from "./create-event";
import PredictEvent from "./predict-event";
import FinalizeEvent from "./finalize-event";
import RedeemEvent from "./redeem-event";
import CancelEvent from "./cancel-event";
import MoreAction from "./more-action";

function MyApp({ Component, pageProps }: AppProps) {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Home`,
      children: <Home />,
    },
    {
      key: "2",
      label: `Create Event`,
      children: <CreateEvent />,
    },
    {
      key: "3",
      label: `Predict Event`,
      children: <PredictEvent />,
    },
    {
      key: "4",
      label: `Finalize Event`,
      children: <FinalizeEvent />,
    },
    {
      key: "5",
      label: `Redeem Event`,
      children: <RedeemEvent />,
    },
    {
      key: "6",
      label: `Cancel Event`,
      children: <CancelEvent />,
    },
    {
      key: "7",
      label: `More Action`,
      children: <MoreAction />,
    },
  ];

  return (
    <AppContext>
      <h1 className="flex justify-center mt-2 mb-4 text-4xl font-extrabold tracking-tight leading-none text-black">
        Demo prediction sdk metaspacecy project
      </h1>
      <div className="container navigator">
        <Tabs defaultActiveKey="1" items={items} style={{ width: "100%" }} />
      </div>
      <Component {...pageProps} />
    </AppContext>
  );
}

export default MyApp;
