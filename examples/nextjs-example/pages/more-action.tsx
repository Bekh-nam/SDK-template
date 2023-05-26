import { Button, Input, Select } from "antd";
import { useMemo, useState } from "react";
import InformationSDK, { getResource } from "../../../src/index";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Collapse } from "antd";
import { HexString } from "aptos";
import { getOptionPrice, getServiceFee } from "../../../src/getResource";
import { getEventByCreator, getJoinedEvent } from "../../../src/services";
const { Panel } = Collapse;

interface IDataInput {
  event_creator?: HexString;
  event_description?: string;
  event_options?: string[];
  token_name?: string;
  predictor?: string;
}
const MoreAction = () => {
  const { network, signAndSubmitTransaction } = useWallet();
  const [result, setResult] = useState();
  const [price, setPrice] = useState<number>();
  const [events, setEvent] = useState();

  const [typeEvent, setTypeEvent] = useState("predict");
  const [serviceFee, setServiceFee] = useState(0);

  const [coinType, setCoinType] = useState("0x1::aptos_coin::AptosCoin");

  const [dataInput, setDateInput] = useState<IDataInput>({
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
  const informationSDk = new InformationSDK(chainID, signAndSubmitTransaction);
  const handleAddMember = () => {
    informationSDk.getOperatorRole().then((data) => setResult(data));
  };
  const getEvent = () => {
    if (typeEvent === "predict") {
      getResource
        .getPredictEventByEventID(
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          chainID,
          coinType
        )
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey") {
      getResource
        .getSurveyEventByEventID(
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          chainID,
          coinType
        )
        .then((data) => setResult(data));
    }
    if (typeEvent === "survey-nft") {
      getResource
        .getSurveyNFTEventByEventID(
          dataInput.event_creator!,
          dataInput.event_description!,
          dataInput.event_options!,
          chainID
        )
        .then((data) => setResult(data));
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
  const handleGetServiceFee = () => {
    getServiceFee(chainID).then((data) => setServiceFee(data));
  };
  const getPrice = async () => {
    const price = await getOptionPrice(
      dataInput.event_creator,
      dataInput.event_description,
      dataInput.event_options,
      chainID,
      dataInput.token_name
    );
    setPrice(+price);
  };
  const getEventByCreatorAddress = async () => {
    const event = await getEventByCreator(dataInput.event_creator, chainID);
    setEvent(event);
  };

  const getEventJoined = async () => {
    const event = await getJoinedEvent(dataInput.predictor, chainID);
    setEvent(event);
  };
  return (
    <div className="container">
      <div className="title">More action</div>
      <Collapse>
        <Panel header="Get Operator role" key="1">
          <Button onClick={handleAddMember}>Get</Button>
          {result && <div>{JSON.stringify(result)}</div>}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Get service fee" key="1">
          <Button onClick={handleGetServiceFee}>Get</Button>
          {serviceFee}
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
                value={
                  dataInput.event_creator?.toString()
                    ? dataInput.event_creator.toString()
                    : ""
                }
              />
            </div>
          </div>
          <div className="input">
            <div className="input-label">Event Options</div>
            <div className="input-field">
              <Input
                placeholder="Option is separated by commas."
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
      <Collapse>
        <Panel header="Get Option Price" key="1">
          <div className="label-title">Get Option Price</div>
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
                value={
                  dataInput.event_creator?.toString()
                    ? dataInput.event_creator.toString()
                    : ""
                }
              />
            </div>
          </div>
          <div className="input">
            <div className="input-label">Event Options</div>
            <div className="input-field">
              <Input
                placeholder="Option is separated by commas."
                name="event_options"
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className="input">
            <div className="input-label">Token Name</div>
            <div className="input-field">
              <Input
                placeholder="Option is separated by commas."
                name="token_name"
                onChange={onChangeInput}
              />
            </div>
          </div>
          <Button onClick={getPrice}>Get</Button>
          {price}
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Get Event By Creator" key="1">
          <div className="input">
            <div className="input-label">Event creator</div>
            <div className="input-field">
              <Input
                placeholder="event_creator"
                name="event_creator"
                onChange={onChangeInput}
                value={
                  dataInput.event_creator?.toString()
                    ? dataInput.event_creator.toString()
                    : ""
                }
              />
            </div>
          </div>
          <Button onClick={getEventByCreatorAddress}>Get</Button>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Get joined events" key="1">
          <div className="input">
            <div className="input-label">Predictor</div>
            <div className="input-field">
              <Input
                placeholder="predictor"
                name="predictor"
                onChange={onChangeInput}
                value={
                  dataInput.predictor?.toString()
                    ? dataInput.predictor.toString()
                    : ""
                }
              />
            </div>
          </div>
          <Button onClick={getEventJoined}>Get</Button>
        </Panel>
      </Collapse>
      {events && <div>{JSON.stringify(events)}</div>}
    </div>
  );
};
export default MoreAction;
