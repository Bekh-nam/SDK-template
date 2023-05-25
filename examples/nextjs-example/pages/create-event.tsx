import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button, DatePicker, DatePickerProps, Input, Select } from "antd";
import InformationSDK from "metaspacecy-aptos-prediction";
import { useMemo, useState } from "react";

interface IDataInput {
  description?: string;
  collection?: string;
  uri?: string;
  reward?: number;
  options?: string[];
  startTime?: number;
  endTime?: number;
  payoutTime?: number;
}
const CreateEvent = () => {
  const { network, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState();
  const [option, setOption] = useState<string>();
  const [typeEvent, setTypeEvent] = useState("predict");
  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");
  const [dataInput, setDataInput] = useState<IDataInput>({
    description: "",
    collection: "",
    uri: "",
    reward: 0,
    options: [],
    startTime: 0,
    endTime: 0,
    payoutTime: 0,
  });

  const chainID = useMemo(() => {
    if (network?.name === "mainnet") {
      return 1;
    }
    if (network?.name === "testnet") {
      return 2;
    }
    return 2;
  }, []);

  const informationSDk = new InformationSDK(signAndSubmitTransaction, chainID, [
    "hash",
  ]);
  console.log(informationSDk);
  const handleChangeTypeEvent = (value: string) => {
    setTypeEvent(value);
  };
  const handleChangeCoinType = (value: string) => {
    setCoinType(value);
  };

  const onChangeStartTime: DatePickerProps["onChange"] = (date) => {
    setDataInput((pre: IDataInput) => {
      return {
        ...pre,
        startTime: Math.ceil(date?.valueOf()! / 1000),
      };
    });
  };

  const onChangeEndTime: DatePickerProps["onChange"] = (date) => {
    setDataInput((pre: IDataInput) => {
      return {
        ...pre,
        endTime: Math.ceil(date?.valueOf()! / 1000),
      };
    });
  };

  const handleCreateEvent = () => {
    if (typeEvent === "predict") {
      informationSDk
        .createPredictEvent(
          dataInput.description!,
          dataInput.uri!,
          dataInput.options!,
          dataInput.startTime!,
          dataInput.endTime!,
          dataInput.payoutTime!,
          coinType
        )
        .then((data) => setResult(data));
      return;
    }
    if (typeEvent === "survey") {
      informationSDk
        .createSuyveyEvent(
          dataInput.description!,
          dataInput.uri!,
          dataInput.reward!,
          dataInput.options!,
          dataInput.startTime!,
          dataInput.endTime!,
          dataInput.payoutTime!,
          coinType
        )
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      informationSDk
        .createSuyveyNFTEvent(
          dataInput.description!,
          dataInput.collection!,
          dataInput.uri!,
          dataInput.options!,
          dataInput.startTime!,
          dataInput.endTime!,
          dataInput.payoutTime!
        )
        .then((data) => setResult(data));
    }
  };

  const onChangeInput = (e: any) => {
    if (e.target.name === "reward") {
      if (e.target.value == +e.target.value) {
        setDataInput((pre: IDataInput) => {
          return {
            ...pre,
            [e.target.name]: +e.target.value,
          };
        });
      }
    }
    if (e.target.name === "options") {
      setDataInput((pre: IDataInput) => {
        const options = e.target.value;
        return {
          ...pre,
          [e.target.name]: [...options.split(",")],
        };
      });
      return;
    }
    setDataInput((pre: IDataInput) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="container">
      <div className="title">Create Event</div>

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
        <div className="input-label">Description</div>
        <div className="input-field">
          <Input
            placeholder="description"
            name="description"
            onChange={onChangeInput}
            value={dataInput.description}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Collection</div>
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
        <div className="input-label">URI</div>
        <div className="input-field">
          <Input
            placeholder="uri"
            name="uri"
            onChange={onChangeInput}
            value={dataInput.uri}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">reward</div>
        <div className="input-field">
          <Input
            placeholder="reward"
            name="reward"
            onChange={onChangeInput}
            value={dataInput.reward}
            disabled={typeEvent !== "survey"}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Options</div>
        <div className="input-field">
          <Input
            placeholder="Option is separated by commas."
            name="options"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Start Time</div>
        <div className="input-field">
          <DatePicker showTime onChange={onChangeStartTime} />
        </div>
      </div>
      <div className="input">
        <div className="input-label">End Time</div>
        <div className="input-field">
          <DatePicker showTime onChange={onChangeEndTime} />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Payout Time</div>
        <div className="input-field">
          <Input
            placeholder="payout time"
            name="payoutTime"
            onChange={onChangeInput}
            value={dataInput.payoutTime}
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

      <Button onClick={handleCreateEvent}>Create Event</Button>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};
export default CreateEvent;
