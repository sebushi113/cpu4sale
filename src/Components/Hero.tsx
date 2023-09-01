import logo from "../assets/digital-money.png";
type Session = Record<string, any>;

type NavbarProps = {
  login: () => void; // Assuming login is a function with no arguments and no return value
  session: Session | undefined;
};
export default function Hero({ login, session }: NavbarProps) {
  return (
    <div className="px-4 pt-3 text-center ">
      <img
        className="d-block mx-auto mb-4"
        src={logo}
        alt=""
        width="72"
        height="57"
      ></img>
      <h1 className="display-5 fw-bold text-body-emphasis">CPU 4 SALE</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          A new cpu renting system on the WAX blockchain allowing anyone to rent
          cpu or deposit wax and earn from renting to others.
        </p>
        {session === undefined && (
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 gap-3"
              onClick={login}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
