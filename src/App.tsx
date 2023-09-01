import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { Chains, Session, SessionKit } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import { WalletPluginWombat } from "@wharfkit/wallet-plugin-wombat";
import { APIClient } from "@wharfkit/antelope";
import WebRenderer from "@wharfkit/web-renderer";
import FAQ from "./Components/FAQs";
import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Important from "./Components/About";

const rpc = new APIClient({
  url: "https://api.waxsweden.org",
});

const sessionKit = new SessionKit({
  appName: "CPU4",
  chains: [Chains.WAX],
  ui: new WebRenderer(),
  walletPlugins: [
    new WalletPluginAnchor(),
    new WalletPluginCloudWallet(),
    new WalletPluginWombat(),
  ],
});

function App() {
  const SEND_OPTIONS = {
    self: "Request Self Stake",
    other: "Stake To User",
    free: "Get Free CPU",
    deposit: "Deposit And Earn",
    update: "Update Balance",
    withdraw: "Withdraw",
  };

  const [session, setSession]: [
    Session | undefined,
    Dispatch<SetStateAction<Session | undefined>>
  ] = useState();
  const [sendOption, setSendOption] = useState(SEND_OPTIONS.self);
  const [numberOfDaysOption, setNumberOfDaysOptions] = useState(3);
  const [amountToSend, setAmountToSend] = useState(1);
  const [amountToBeStaked, setAmountToBeStaked] = useState(0);
  const [accountToStake, setAccountToStake] = useState("");
  const [currentBalance, setCurrentBalance] = useState("0");
  const [response, setResponse] = useState({});
  const [totalWax, setTotalWax] = useState(0);
  const [freeWax, setFreeWax] = useState("0");
  const [waxBalance, setWaxBalance] = useState("");

  useEffect(() => {
    const fetchWaxSupply = async () => {
      const table = await rpc.v1.chain.get_table_rows({
        json: true,
        code: "cpu4",
        scope: "cpu4",
        table: "config",
        limit: 1,
        reverse: false,
        show_payer: false,
      });
      if (table.rows && table.rows.length > 0) {
        // const ex = parseFloat(table.rows[0].exponent);
        const tw = parseFloat(table.rows[0].total_wax);
        const cl = parseFloat(table.rows[0].current_loaned);
        // const mdf = parseFloat(table.rows[0].multi_day_fee);
        const totalWax = table.rows[0].total_wax;
        const freeWax = (tw - cl).toFixed(8) + " WAX";

        setTotalWax(totalWax);
        setFreeWax(freeWax);
      }
    };

    fetchWaxSupply();
  }, []);

  useEffect(() => {
    sessionKit.restore().then((restored) => setSession(restored));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("FETCH");
      const table = await rpc.v1.chain.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "config", // Table name
        limit: 1, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });
      const table2 = await rpc.v1.chain.get_table_rows({
        json: true, // Get the response as json
        code: "cpu4", // Contract that we target
        scope: "cpu4", // Account that owns the data
        table: "deposits", // Table name
        limit: 1000, // Maximum number of rows that we want to get
        reverse: false, // Optional: Get reversed data
        show_payer: false, // Optional: Show ram payer
      });
      setResponse({ r1: table, r2: table2 });
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  const getFirstApiCall = async () => {
    getAcctBalance();
    const table = await rpc.v1.chain.get_table_rows({
      json: true, // Get the response as json
      code: "cpu4", // Contract that we target
      scope: "cpu4", // Account that owns the data
      table: "config", // Table name
      limit: 1, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });
    const table2 = await rpc.v1.chain.get_table_rows({
      json: true, // Get the response as json
      code: "cpu4", // Contract that we target
      scope: "cpu4", // Account that owns the data
      table: "deposits", // Table name
      limit: 1000, // Maximum number of rows that we want to get
      reverse: false, // Optional: Get reversed data
      show_payer: false, // Optional: Show ram payer
    });
    setResponse({ r1: table, r2: table2 });
  };

  useEffect(() => {
    const run = async () => {
      if (Object.keys(response).length != 0) {
        try {
          const table = (response as any).r1;
          // console.log(table["rows"][0]);

          const ex = parseFloat(table["rows"][0].exponent);
          const tw = parseFloat(table["rows"][0].total_wax);
          const cl = parseFloat(table["rows"][0].current_loaned);
          const mdf = parseFloat(table["rows"][0].multi_day_fee);

          setTotalWax(table["rows"][0].total_wax);
          setFreeWax(tw - cl + " WAX");

          if (amountToSend && amountToSend > 0) {
            var multiplier = Math.pow(1.0 - cl / tw, ex) * 850;
            if (multiplier < 200) {
              multiplier = 200;
            }
            var total =
              multiplier *
              (1 - mdf * (numberOfDaysOption - 1)) *
              (amountToSend / numberOfDaysOption);
            // console.log(total);
            setAmountToBeStaked(total);
          } else {
            setAmountToBeStaked(0);
          }
          if (session) {
            const table2 = (response as any).r2;
            setCurrentBalance("0 WAX");
            for (var i = 0; i < table2["rows"].length; i++) {
              if (table2["rows"][i].account === String(session.actor)) {
                setCurrentBalance(table2["rows"][i].wax);
              }
            }
            console.log("session.actor");
            console.log(session.actor);
            console.log(typeof session.actor);
          }
        } catch (e) {
          console.error(e);
          console.log(JSON.stringify(e));
        }
      }
    };

    run();
  }, [amountToSend, numberOfDaysOption, response, session]);

  useEffect(() => {
    const run = async () => {
      if (session) {
        try {
          getFirstApiCall();
        } catch (e) {
          console.error(e);
          // process.exit();
          console.log(JSON.stringify(e));
        }
      }
    };
    run();
  }, [session]);

  async function login() {
    const response = await sessionKit.login();
    setSession(response.session);
    console.log(response.session);
    const balance = await response.session.client.v1.chain.get_account(
      response.session.actor
    );
    console.log(String(balance.core_liquid_balance));
  }

  async function logout() {
    sessionKit.logout(session);
    setSession(undefined);
  }

  async function getAcctBalance() {
    if (session) {
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance.core_liquid_balance));
    }
  }

  const transactionStakeToSelf = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "eosio.token",
        name: "transfer",
        authorization: [session.permissionLevel],
        data: {
          from: session.actor,
          to: "cpu4",
          quantity: parseFloat(String(amountToSend)).toFixed(8) + " WAX",
          memo: numberOfDaysOption + "",
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance));
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
    }
  };

  const transactionStakeToUser = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "eosio.token",
        name: "transfer",
        authorization: [session.permissionLevel],
        data: {
          from: session.actor,
          to: "cpu4",
          quantity: parseFloat(String(amountToSend)).toFixed(8) + " WAX",
          memo: "USER:" + accountToStake + "," + numberOfDaysOption,
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance));
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    }
  };

  const transactionFreeCPU = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "free.cpu4",
        name: "getcpu",
        authorization: [session.permissionLevel],
        data: {
          username: accountToStake,
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance));
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    }
  };

  const transactionDeposit = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "eosio.token",
        name: "transfer",
        authorization: [session.permissionLevel],
        data: {
          from: session.actor,
          to: "cpu4",
          quantity: parseFloat(String(amountToSend)).toFixed(8) + " WAX",
          memo: "Deposit",
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance));
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    }
  };

  const transactionUpdateBalance = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "cpu4",
        name: "updatebalance",
        authorization: [session.permissionLevel],
        data: {
          username: session.actor,
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    }
  };

  const transactionWithdraw = async () => {
    if (!session) {
      throw new Error("Cannot transact without a session.");
    } else {
      const action = {
        account: "cpu4",
        name: "withdraw",
        authorization: [session.permissionLevel],
        data: {
          username: session.actor,
          amount: parseFloat(String(amountToSend)).toFixed(8) + " WAX",
        },
      };
      session
        .transact({ action }, { broadcast: true, expireSeconds: 300 })
        .catch((e) => {
          console.log("error caught in transact", e);
          alert(e);
        });
      const waxBalance = await session.client.v1.chain.get_account(
        session.actor
      );
      setWaxBalance(String(waxBalance));
      setNumberOfDaysOptions(3);
      setAmountToBeStaked(0);
      setAmountToSend(1);
      setAccountToStake("");
    }
  };

  const TRANSACTIONS = {
    [SEND_OPTIONS.self]: transactionStakeToSelf,
    [SEND_OPTIONS.other]: transactionStakeToUser,
    [SEND_OPTIONS.free]: transactionFreeCPU,
    [SEND_OPTIONS.deposit]: transactionDeposit,
    [SEND_OPTIONS.update]: transactionUpdateBalance,
    [SEND_OPTIONS.withdraw]: transactionWithdraw,
  };

  const renderSelectSendOption = () => {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <select
            className="form-select form-select-lg mb-3 text-center"
            style={{ width: "auto" }}
            aria-label="Large select example"
            value={sendOption}
            onChange={(e) => setSendOption(e.target.value)}
          >
            <option value={SEND_OPTIONS.self}>{SEND_OPTIONS.self}</option>
            <option value={SEND_OPTIONS.other}>{SEND_OPTIONS.other}</option>
            <option value={SEND_OPTIONS.free}>{SEND_OPTIONS.free}</option>
            <option value={SEND_OPTIONS.deposit}>{SEND_OPTIONS.deposit}</option>
            <option value={SEND_OPTIONS.update}>{SEND_OPTIONS.update}</option>
            <option value={SEND_OPTIONS.withdraw}>
              {SEND_OPTIONS.withdraw}
            </option>
          </select>
          <br />
          <br />
        </div>
        {renderForm()}
        <br />
        {renderSubmitButton()}
      </div>
    );
  };

  const renderForm = () => {
    if (sendOption === SEND_OPTIONS.self) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>
            {renderAmountToSendInput()}
            {renderNumberOfDaysDropdown()}
            {renderAmountToBeStaked()}
          </tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.other) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>
            {renderAmountToSendInput()}
            {renderNumberOfDaysDropdown()}
            {renderUserInput()}
            {renderAmountToBeStaked()}
          </tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.free) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderUserInput()}</tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.deposit) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderAmountToSendInput()}</tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.update) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderUpdateBalance()}</tbody>
        </table>
      );
    } else if (sendOption === SEND_OPTIONS.withdraw) {
      return (
        <table
          style={{
            margin: "auto",
            borderSpacing: "12px 12px",
            textAlign: "left",
          }}
        >
          <tbody>{renderWithdraw()}</tbody>
        </table>
      );
    }
  };

  const renderUserInput = () => {
    return (
      <tr>
        {/* <td style={{ textAlign: "right" }}>User to stake to</td> */}
        {/* <td style={{ textAlign: "right", paddingRight: "10px" }}>
          User to stake to
        </td>
        <td>
          <input
            style={{ width: "120px" }} */}
        <td
          style={{
            textAlign: "right",
            paddingRight: "10px",
            height: "40px",
            verticalAlign: "middle",
          }}
        >
          User to stake to
        </td>
        <td>
          <input
            style={{ width: "120px", height: "100%", verticalAlign: "middle" }}
            type="text"
            value={accountToStake}
            onChange={(e) => setAccountToStake(e.target.value)}
          />
        </td>
      </tr>
    );
  };

  const renderNumberOfDaysDropdown = () => {
    return (
      <tr>
        {/* <td style={{ textAlign: "right" }}>Number of days</td> */}
        {/* <td style={{ textAlign: "right", paddingRight: "10px" }}>
          Number of days
        </td>
        <td>
          <select */}
        <td
          style={{
            textAlign: "right",
            paddingRight: "10px",
            height: "40px",
            verticalAlign: "middle",
          }}
        >
          Number of days
        </td>
        <td>
          <select
            style={{ height: "100%", verticalAlign: "middle" }}
            value={numberOfDaysOption}
            onChange={(e) => setNumberOfDaysOptions(parseInt(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
          </select>
        </td>
      </tr>
    );
  };

  const renderAmountToSendInput = () => {
    return (
      <tr>
        {/* <td style={{ textAlign: "right" }}>Amount to send </td> */}
        {/* <td style={{ textAlign: "right", paddingRight: "10px" }}>
          Amount to send
        </td>
        <td>
          <input
            style={{ width: "60px" }} */}
        <td
          style={{
            textAlign: "right",
            paddingRight: "10px",
            height: "40px",
            verticalAlign: "middle",
          }}
        >
          Amount to send
        </td>
        <td>
          <input
            style={{ width: "60px", height: "100%", verticalAlign: "middle" }}
            type="number"
            value={amountToSend}
            onChange={(e) => setAmountToSend(parseFloat(e.target.value))}
          />{" "}
          WAX
        </td>
      </tr>
    );
  };

  const renderUpdateBalance = () => {
    return <tr></tr>;
  };

  const renderWithdraw = () => {
    return (
      <tr>
        {/* <td style={{ textAlign: "right" }}>Amount to withdraw</td> */}
        {/* <td style={{ textAlign: "right", paddingRight: "10px" }}>
          Amount to withdraw
        </td>
        <td>
          <input
            style={{ width: "60px" }} */}
        <td
          style={{
            textAlign: "right",
            paddingRight: "10px",
            height: "40px",
            verticalAlign: "middle",
          }}
        >
          Amount to withdraw
        </td>
        <td>
          <input
            style={{ width: "60px", height: "100%", verticalAlign: "middle" }}
            type="number"
            value={amountToSend}
            onChange={(e) => setAmountToSend(parseFloat(e.target.value))}
          />{" "}
          WAX
        </td>
      </tr>
    );
  };

  const renderAmountToBeStaked = () => {
    return (
      <tr>
        {/* <td style={{ textAlign: "right" }}>Amount to be staked</td> */}
        <td style={{ textAlign: "right", paddingRight: "10px" }}>
          Amount to be staked
        </td>

        <td>{amountToBeStaked.toLocaleString()} WAX</td>
      </tr>
    );
  };

  const renderSubmitButton = () => {
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => TRANSACTIONS[sendOption].call(null)}
        >
          {sendOption}
        </button>
      </div>
    );
  };

  const depositedWax = () => {
    return session ? (
      <div>
        Deposited: {currentBalance}
        <br />
        <br />
      </div>
    ) : null;
  };

  const waxSupply = () => {
    return (
      <div>
        Total Wax in System: {totalWax}
        <br />
        <p style={{ color: "red" }}>Wax Available to Rent: {freeWax}</p>
        <br />
      </div>
    );
  };

  return (
    <>
      <div className="App">
        <Navbar login={login} logout={logout} session={session}></Navbar>
        {/* <Hero login={login} session={session}></Hero> */}
        <h1 className="display-5 fw-bold text-body-emphasis">CPU 4 SALE</h1>
        {waxSupply()}
        {!session ? (
          <div></div>
        ) : (
          <>
            <p>
              {String(session.actor)}
              <br />
              Current Balance: {waxBalance}
              {depositedWax()}
            </p>
          </>
        )}
        {renderSelectSendOption()}
        <Important></Important>
        <Features></Features>
        <FAQ></FAQ>
      </div>
    </>
  );
}

export default App;
