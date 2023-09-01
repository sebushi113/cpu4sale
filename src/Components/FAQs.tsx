export default function FAQ() {
  return (
    <div className="container px-4 py-5" id="faqs">
      <h2 className="pb-2">Frequently Asked Questions</h2>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              What is cpu4?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              CPU4 is a new cpu renting system on the wax blockchain, created
              with help from the WAX Dev team and community members(Vaaaan,
              deraXyna). It allows anyone to rent cpu or deposit wax and earn
              from renting to others. The price is dynamically set between a 1%
              and 10% fee and it changes every time someone deposits, withdraws,
              rents, returns wax. Users first send the fee then get staked the
              amount of wax it would pay for. Users are limited to how much they
              can rent in a single transaction but can make multiple requests as
              long as there is wax available. There is also a free system
              implemented but it has limits too.<br></br>
              <br></br>
              The system will be open for 1 week before allowing users to
              deposit their own wax to earn. If users find bugs there is a bug
              bounty program on discord.<br></br>
              <br></br>
              <strong className="text-danger">
                Disclaimer: Deposits are open. Use at your own risk, all
                transactions are final and irreversible. There is no guarantee
                of profit or return. If bugs arise I will do my best to fix them
                asap.
              </strong>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="pricing"
            >
              How are fees calculated?
            </button>
          </h2>
          <div
            id="pricing"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              multiplier = (1.0 - (current loaned wax / total wax in
              system))^(exponent) * 100<br></br>
              <br></br>
              if the multiplier is less than 10 then we just use 10.<br></br>
              <br></br>
              total staked wax = multiplier * (1 - (multi day fee * (number of
              days requested - 1))) * (wax sent in / number of days requested)
              <br></br>
              <br></br>
              This process keeps the price dynamic based on the current load and
              changes with every buy or unstake.<br></br>
              <br></br>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Is this code public?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              All the website code is located at<br></br>{" "}
              https://github.com/cpu4youu/cpu4youu.github.io
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              How do depositors earn?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Every time someone requests some wax they need to first send in a
              fee.<br></br>
              <br></br>
              That fee is broken up into 4 parts.<br></br>
              <br></br>
              70% which goes to the depositors pool<br></br>
              <br></br>
              15% goes to the admin.cpu4 account (For dev team)<br></br>
              <br></br>
              10% goes to the reserve.cpu4 account<br></br>
              <br></br>
              5% goes to the free.cpu4 account<br></br>
              <br></br>
              As long as a user has some wax deposited they earn their share of
              the 70% of the fees collected The admin fee funds the development
              of new updates and sets the system up to have great service The
              reserve is a special account. It collects fees until the current
              rate of wax to cpu is 1 - 10. Once this happens the system
              requests wax and all the wax in the reserve account get sent back
              to the cpu4 account. This does a few things, it lowers the current
              fee and rates the rate for users meaning before a user sends 1 wax
              in and gets 10 staked but now maybe the send 1 in and get 20
              staked. It also adds liquidity if users are trying to withdraw,
              and it grows the system wax which helps more users get access to
              cpu. Then finally the free.cpu4 account is set up as a completely
              free system. Users can directly go to the smart contract and enter
              a username to recieve some free cpu every 48 hours. As long as it
              has wax it can continue to service users. Since it is funded by
              the normal app, as long as the normal app is being used it will
              keep getting wax to give to users for free. The rates/fees and
              starting value for the free account are all subject to change. Any
              changes will be posted on this page.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              How does staking work?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              I use multiple minion accounts to stake to users on a per request
              basis. No minion stakes to more than 1 user at a time and so it
              can be very efficient. I also use a dynamic system to unstake and
              keep track of minions who are done but still not free. All smart
              contract code is proprietary software.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              I found a bug, what do I do?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Please go to the discord and find the bug bounty channel.
              Depending no how severe it is, you can be compensated for posting
              it first.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              I need help or have a question where do I go?
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Discord: https://discord.gg/UJzBuRa9sY <br></br>
              <br></br>
              Telegram:https://t.me/joinchat/L2y-P0pVWS5lMTkx
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              Why did you start this, can I trust you?
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              I have been creating smart contracts and dapps for almost a year
              now but programming since 2014. The wax dev team sponsored my
              research and development in creating this service for everyone and
              I intend to keep updating it and bringing new features to users
              and allowing users free access to my services.<br></br>
              Some wax projects I have worked on are:<br></br>
              Nova Rally<br></br>
              Olive Land<br></br>
              Beast Garden<br></br>
              Gods and Legends<br></br>
              Poly Play<br></br>I also have an Alien Worlds cpu service located
              at www.limitlesswax.co<br></br>
              Thank you for your time, I hope you enjoy my service!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
