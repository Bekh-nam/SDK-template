import { Button, Input, Select } from "antd";
import { useMemo, useState } from "react";
import InformationSDK from "../../../src/index";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface IDataInput {
  outcomes: number[];
  event_description?: string;
  event_options?: string[];
}

const FinalizeEvent = () => {
  const [typeEvent, setTypeEvent] = useState("predict");
  const { network, signAndSubmitTransaction } = useWallet();
  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");
  const [result, setResult] = useState();

  const [dataInput, setDateInput] = useState<IDataInput>({
    outcomes: [],
    event_description: "",
    event_options: [],
  });

  const chainID = useMemo(() => {
    if (network?.name === "mainnet") {
      return 1;
    }
    if (network?.name === "testnet") {
      return 2;
    }
    return 41;
  }, []);

  const handleChangeTypeEvent = (value: string) => {
    setTypeEvent(value);
  };
  const handleChangeCoinType = (value: string) => {
    setCoinType(value);
  };
  const onChangeInput = (e: any) => {
    if (e.target.name === "outcomes") {
      setDateInput((pre: IDataInput) => {
        const options = e.target.value;
        return {
          ...pre,
          [e.target.name]: [...options.split(",")],
        };
      });
      return;
    }
    if (e.target.name === "event_options") {
      setDateInput((pre: IDataInput) => {
        const options = e.target.value;
        return {
          ...pre,
          [e.target.name]: [...options.split(",")],
        };
      });
      return;
    }
    setDateInput((pre: IDataInput) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };
  const informationSDk = new InformationSDK(signAndSubmitTransaction, chainID);

  const handleFinalizeEvent = () => {
    if (typeEvent === "predict") {
      informationSDk
        .finalizePredictEvent(
          dataInput.event_description!,
          dataInput.event_options!,
          dataInput.outcomes,
          coinType
        )
        .then((data) => setResult(data));
      return;
    }
    if (typeEvent === "survey") {
      informationSDk
        .finalizeSurveyEvent(
          dataInput.event_description!,
          dataInput.event_options!,
          dataInput.outcomes,
          coinType
        )
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      informationSDk
        .finalizeSurveyNFTEvent(
          dataInput.event_description!,
          dataInput.event_options!,
          dataInput.outcomes
        )
        .then((data) => setResult(data));
    }
  };
  return (
    <div className="container">
      <div className="title">Finalize event</div>
      <div className="input">
        <div className="input-label">Type Event</div>
        <div className="input-field">
          <Select
            defaultValue={typeEvent}
            onChange={handleChangeTypeEvent}
            options={[
              { value: "predict", label: "Predict" },
              { value: "survey", label: "Survey" },
              { value: "survey-nft", label: "Survey-NFT" },
            ]}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Event OutComes</div>
        <div className="input-field">
          <Input
            placeholder="outcomes"
            name="outcomes"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Event Description</div>
        <div className="input-field">
          <Input
            placeholder="event_description"
            name="event_description"
            onChange={onChangeInput}
            value={dataInput.event_description}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Event Options</div>
        <div className="input-field">
          <Input
            placeholder="event_options"
            name="event_options"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Coin Type</div>
        <div className="input-field">
          <Select
            defaultValue={coinType}
            onChange={handleChangeCoinType}
            options={[{ value: "0x1::aptos_coin::AptosCoin", label: "APT" }]}
          />
        </div>
      </div>

      <Button onClick={handleFinalizeEvent}>Finalize Event</Button>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};
export default FinalizeEvent;
