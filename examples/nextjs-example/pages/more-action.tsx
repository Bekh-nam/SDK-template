import { Button, Input, Select } from "antd";
import { useMemo, useState } from "react";
import InformationSDK from "../../../src/index";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Collapse } from "antd";
import { getPredictEventByEventID, getSurveyEventByEventID, getSurveyNFTEventByEventID } from "../../../src/getResource";
const { Panel } = Collapse;

interface IDataInput {
  event_creator?: string;
  event_description?: string;
  event_options?: string[];
}
const MoreAction = () => {
  const { network, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState();
  const [memberAddress, setMemberAddress] = useState();
  const [typeEvent, setTypeEvent] = useState("predict");
  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");

  const [dataInput, setDateInput] = useState<IDataInput>({
    event_creator: "",
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
    return 2;
  }, []);

  const handleChangeTypeEvent = (value: string) => {
    setTypeEvent(value);
  };
  const handleChangeCoinType = (value: string) => {
    setCoinType(value);
  };
  const onChangeMemberAddress = (e: any) => {
    setMemberAddress(e.target.value);
  };
  const informationSDk = new InformationSDK(signAndSubmitTransaction, chainID);
  const handleAddMember = () => {
    informationSDk
      .addMemberToOperatorRole(memberAddress!)
      .then((data) => setResult(data));
  };
  const getEvent = () => {
    if (typeEvent === "predict") {
      getPredictEventByEventID(
        dataInput.event_creator!,
        dataInput.event_description!,
        dataInput.event_options!,
        chainID,
        coinType
      ).then((data) => setResult(data));
    }
    if (typeEvent === "survey") {
      getSurveyEventByEventID(
        dataInput.event_creator!,
        dataInput.event_description!,
        dataInput.event_options!,
        chainID,
        coinType
      ).then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      getSurveyNFTEventByEventID(
        dataInput.event_creator!,
        dataInput.event_description!,
        dataInput.event_options!,
        chainID,
        coinType
      ).then((data) => setResult(data));
    }
  };

  const onChangeInput = (e: any) => {
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
  return (
    <div className="container">
      <div className="title">More action</div>
      <Collapse>
        <Panel header="Add member to Operator role" key="1">
          <div className="input">
            <div className="input-label">Member address</div>
            <div className="input-field">
              <Input
                placeholder="address"
                name="address"
                onChange={onChangeMemberAddress}
                value={memberAddress}
              />
            </div>
          </div>
          <Button onClick={handleAddMember}>Add</Button>
          {result && <div>{JSON.stringify(result)}</div>}
        </Panel>
      </Collapse>

      <Collapse>
        <Panel header="Get Event" key="1">
          <div className="label-title">Get event</div>
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
                options={[
                  { value: "0x1::aptos_coin::AptosCoin", label: "APT" },
                ]}
              />
            </div>
          </div>
          <Button onClick={getEvent}>Get</Button>
          {result && <div>{JSON.stringify(result)}</div>}
        </Panel>
      </Collapse>
    </div>
  );
};
export default MoreAction;
