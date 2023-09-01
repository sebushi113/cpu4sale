export default function About() {
  return (
    <div className="container my-5" id="about">
      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">About</h1>
        <p className="lead">
          CPU4 is a new cpu renting system on the wax blockchain, created with
          help from the WAX Dev team and community members(Vaaaan, deraXyna). It
          allows anyone to rent cpu or deposit wax and earn from renting to
          others. The price is dynamically set between a 1% and 10% fee and it
          changes every time someone deposits, withdraws, rents or returns wax.
          Users first send the fee then get staked the amount of wax it would
          pay for. Users are limited to how much they can rent in a single
          transaction but can make multiple requests as long as there is wax
          available. There is also a free system implemented but it has limits
          too.
          <br></br>
          <br></br>
          The system will be open for 1 week before allowing users to deposit
          their own wax to earn. If users find bugs there is a bug bounty
          program on discord.<br></br>
          <br></br>
          <strong className="text-danger">
            Disclaimer: Deposits are open. Use at your own risk, all
            transactions are final and irreversible. There is no guarantee of
            profit or return. If bugs arise I will do my best to fix them asap.
          </strong>
        </p>
      </div>
    </div>
  );
}
