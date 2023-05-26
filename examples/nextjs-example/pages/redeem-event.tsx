import { Button, Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import InformationSDK, {
  Constants,
  getResource,
} from "@metaspacecy/information-sdk/move";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface IDataInput {
  creator: string;
  name?: string;
  amount?: number;
}

const RedeemEvent = () => {
  const [typeEvent, setTypeEvent] = useState("predict");
  const { network, signAndSubmitTransaction, account } = useWallet();
  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");
  const [result, setResult] = useState();
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  const [dataInput, setDateInput] = useState<IDataInput>({
    creator: "",
    name: "",
    amount: 0,
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
        .redeemPredictEvent(dataInput.name!, dataInput.amount!, coinType)
        .then((data) => setResult(data));
      return;
    }
    if (typeEvent === "survey") {
      informationSDk
        .redeemSurveyEvent(dataInput.name!, coinType)
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      informationSDk
        .redeemSurveyNFTEvent(dataInput.name!, dataInput.amount!)
        .then((data) => setResult(data));
    }
  };

  useEffect(() => {
    if (dataInput.name) {
      getResource
        .getTokenForAccount(account?.address!, dataInput.name, chainID)
        .then((data) => setTokenBalance(+data));
    }
  }, [dataInput.name]);
  return (
    <div className="container">
      <div className="title">Redeem event</div>
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
        <div className="input-label">Event Creator</div>
        <div className="input-field">
          <Input
            placeholder="creator"
            name="creator"
            onChange={onChangeInput}
            value={dataInput.creator}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Event Collection</div>
        <div className="input-field">
          <Input
            placeholder="collection"
            name="collection"
            disabled={true}
            value={Constants.COLLECTION[chainID]}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token Name</div>
        <div className="input-field">
          <Input
            placeholder="name"
            name="name"
            onChange={onChangeInput}
            value={dataInput.name}
          />
        </div>
      </div>
      <div className="input">
        <div className="input-label">Token Amount</div>
        <div className="input-field">
          <div className="input-tag">Balance: {tokenBalance}</div>
          <Input
            placeholder="amount"
            name="amount"
            onChange={onChangeInput}
            value={dataInput.amount}
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

      <Button onClick={handleFinalizeEvent}>Redeem Event</Button>
      {result && <div>{JSON.stringify(result)}</div>}
    </div>
  );
};
export default RedeemEvent;
