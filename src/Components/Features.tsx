export default function Features() {
  return (
    <div className="container px-4 py-5" id="features">
      <h2 className="pb-2 border-bottom">
        Interact with the smart contract in a number of ways
      </h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Request CPU for Self</h3>
          <p>
            The system dynamically creates a price for the staked wax given the
            current supply, total loaned out, number of days, and amount user
            requests. Then that wax is sent to a minion account and staked to
            the user for the given time.
          </p>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Request CPU for Others</h3>
          <p>
            Similar to requesting to yourself, this does the first few steps but
            then directly stakes to the user specified. This can be sent from
            anyone for anyone else.
          </p>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Withdraw Deposited Wax</h3>
          <p>
            At any time a user can request to withdraw deposited wax. A user can
            make as many withdraw requests as they want up to the total wax they
            have deposited. If there is not enough liquid wax, as more gets
            unstaked it will be sent in order to users in line to withdraw.
          </p>
        </div>

        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Deposit to Earn</h3>
          <p>
            Users can also deposit wax to earn 70% of the total fees collected.
          </p>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Update Collected Fees</h3>
          <p>
            This method is not required but will immediately update the table
            entry with how much wax the user has. This function will update the
            fees in the contract table and show you how much you could withdraw
            in total.
          </p>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <img className="bi" width="1em" height="1em"></img>
          </div>
          <h3 className="fs-2 text-body-emphasis">Request Free CPU</h3>
          <p>
            As long as this account has wax it will send in a specified amount
            to the main contract requesting cpu as if it was a regular user.
          </p>
        </div>
      </div>
    </div>
  );
}
