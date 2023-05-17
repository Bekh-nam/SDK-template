import { Button, Input, Select } from "antd";
import { useMemo, useState } from "react";
import InformationSDK from "../../../src/index";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface IDataInput {
  option?: string;
  amount?: number;
  event_creator?: string;
  event_description?: string;
  event_options?: string[];
  token_creator?: string;
  collection?: string;
  token_name?: string;
  token_version?: number;
}

const PredictEvent = () => {
  const [typeEvent, setTypeEvent] = useState("predict");
  const { network, signAndSubmitTransaction } = useWallet();
  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");
  const [result, setResult] = useState();

  const [dataInput, setDateInput] = useState<IDataInput>({
    option: "",
    amount: 0,
    event_creator: "",
    event_description: "",
    event_options: [],
    token_creator: "",
    collection: "",
    token_name: "",
    token_version: 0,
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
    if (e.target.name === "amount") {
      if (e.target.value == +e.target.value) {
        setDateInput((pre: IDataInput) => {
          return {
            ...pre,
            [e.target.name]: +e.target.value,
          };
        });
      }
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

  const handlePredictEvent = () => {
    if (typeEvent === "predict") {
      informationSDk
        .predictEvent(
          dataInput.option!,
          dataInput.amount!,
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          coinType
        )
        .then((data) => setResult(data));
      return;
    }
    if (typeEvent === "survey") {
      informationSDk
        .surveyEvent(
          dataInput.option!,
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          coinType
        )
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      informationSDk
        .surveyNFTEvent(
          dataInput.option!,
          dataInput.amount!,
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          dataInput.token_creator!,
          dataInput.collection!,
          dataInput.token_name!,
          dataInput.token_version!
        )
        .then((data) => setResult(data));
    }
  };
  console.log(dataInput);
  return (
    <div className="container">
      <div className="title">Predict event</div>
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
        <div className="input-label">Option</div>
        <div className="input-field">
          <Input
            placeholder="option"
            name="option"
            onChange={onChangeInput}
            value={dataInput.option}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Amount</div>
        <div className="input-field">
          <Input
            placeholder="amount"
            name="amount"
            onChange={onChangeInput}
            value={dataInput.amount}
            disabled={typeEvent === "survey"}
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
        <div className="input-label">Event creator</div>
        <div className="input-field">
          <Input
            placeholder="event_creator"
            name="event_creator"
            onChange={onChangeInput}
            value={dataInput.event_creator}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token Creator</div>
        <div className="input-field">
          <Input
            placeholder="token_creator"
            name="token_creator"
            onChange={onChangeInput}
            value={dataInput.token_creator}
            disabled={typeEvent !== "survey-nft"}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token Collection</div>
        <div className="input-field">
          <Input
            placeholder="collection"
            name="collection"
            onChange={onChangeInput}
            value={dataInput.collection}
            disabled={typeEvent !== "survey-nft"}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token Name</div>
        <div className="input-field">
          <Input
            placeholder="token_name"
            name="token_name"
            onChange={onChangeInput}
            value={dataInput.token_name}
            disabled={typeEvent !== "survey-nft"}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token version</div>
        <div className="input-field">
          <Input
            placeholder="token_version"
            name="token_version"
            onChange={onChangeInput}
            value={dataInput.token_version}
            disabled={typeEvent !== "survey-nft"}
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

      <Button onClick={handlePredictEvent}>Predict Event</Button>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};
export default PredictEvent;
