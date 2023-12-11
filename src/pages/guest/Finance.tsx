import { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { ButtonLink, Button } from "../../components/Button";
import Assets from "../../components/Assets.jsx";
import { renderFinanceDisplay, toggleDisplay } from "../../hooks/FinanceHooks";
import { CardInfo } from "../../middleware/Interfaces";

export default function Finance() {
  const [bronzeDisplay, setBronzeDisplay] = useState<boolean>(false);
  const [goldDisplay, setGoldDisplay] = useState<boolean>(false);
  const [silverDisplay, setSilverDisplay] = useState<boolean>(false);

  const [bronzeFinanceDisplay, setBronzeFinanceDisplay] =
    useState<boolean>(false);
  const [silverFinanceDisplay, setSilverFinanceDisplay] =
    useState<boolean>(false);
  const [goldFinanceDisplay, setGoldFinanceDisplay] = useState<boolean>(false);

  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [email, setEmail] = useState<string>("");

  return (
    <main id="finance">
      <Nav pageHeading={"Financial Options for Car Services"} />

      {bronzeFinanceDisplay || silverFinanceDisplay || goldFinanceDisplay ? (
        <section>
          {bronzeFinanceDisplay
            ? renderFinanceDisplay({
                text: "bronze",
                display: bronzeFinanceDisplay,
                setDisplay: (e: boolean) => setBronzeFinanceDisplay(e),
                cardInfo: cardInfo,
                setCardInfo: (e: CardInfo) => setCardInfo(e),
                email: email,
                setEmail: (e: string) => setEmail(e),
              })
            : ""}
          {silverFinanceDisplay
            ? renderFinanceDisplay({
                text: "silver",
                display: silverFinanceDisplay,
                setDisplay: (e: boolean) => setSilverFinanceDisplay(e),
                cardInfo: cardInfo,
                setCardInfo: (e: CardInfo) => setCardInfo(e),
                email: email,
                setEmail: (e: string) => setEmail(e),
              })
            : ""}
          {goldFinanceDisplay
            ? renderFinanceDisplay({
                text: "gold",
                display: goldFinanceDisplay,
                setDisplay: (e: boolean) => setGoldFinanceDisplay(e),
                cardInfo: cardInfo,
                setCardInfo: (e: CardInfo) => setCardInfo(e),
                email: email,
                setEmail: (e: string) => setEmail(e),
              })
            : ""}
        </section>
      ) : (
        <section>
          <section className="flex flex-col">
            <h2>Subscription Plans</h2>

            <section className="flex justifyAround alignCenter">
              <div className="imageContainer flex alignCenter justifyCenter flex-col">
                <h3>
                  Bronze Plan{" "}
                  <i
                    className="fa-solid fa-circle-info button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setBronzeDisplay(e),
                        bronzeDisplay,
                      )
                    }
                  ></i>
                </h3>
                <img
                  src={Assets.blackCard}
                  alt="generic business black credit card"
                  onClick={() =>
                    toggleDisplay(
                      (e: boolean) => setBronzeDisplay(e),
                      bronzeDisplay,
                    )
                  }
                />
                {Button({
                  text: "Show Bronze Plan Payment Form",
                  handleButtonClick: () =>
                    toggleDisplay(
                      (e: boolean) => setBronzeFinanceDisplay(e),
                      bronzeFinanceDisplay,
                    ),
                })}
                <p
                  className={`${
                    bronzeDisplay ? "" : "displayNone"
                  } clearButton flex flex-col alignStart`}
                >
                  <i
                    className="fa-solid fa-xmark button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setBronzeDisplay(e),
                        bronzeDisplay,
                      )
                    }
                  ></i>
                  $75/month includes 3 services per year (Oil Change, Tire
                  Rotation, and 20-point Inspection).
                </p>
              </div>
              <div className="imageContainer blueCardContainer flex alignCenter justifyCenter flex-col">
                <h3>
                  Silver Plan{" "}
                  <i
                    className="fa-solid fa-circle-info button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setSilverDisplay(e),
                        silverDisplay,
                      )
                    }
                  ></i>
                </h3>
                <img
                  src={Assets.blueCard}
                  className="blueCard"
                  alt="generic blue Visa debit card with a Vivid logo centered on the card"
                  onClick={() =>
                    toggleDisplay(
                      (e: boolean) => setSilverDisplay(e),
                      silverDisplay,
                    )
                  }
                />
                {Button({
                  text: "Show Silver Plan Payment Form",
                  handleButtonClick: () =>
                    toggleDisplay(
                      (e: boolean) => setSilverFinanceDisplay(e),
                      silverFinanceDisplay,
                    ),
                })}
                <p
                  className={`${
                    silverDisplay ? "" : "displayNone"
                  } clearButton flex flex-col alignStart`}
                >
                  <i
                    className="fa-solid fa-xmark button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setSilverDisplay(e),
                        silverDisplay,
                      )
                    }
                  ></i>
                  $120/month includes 6 services per year (Silver Subscription +
                  Brake Check, Engine Diagnostic).
                </p>
              </div>
              <div className="imageContainer goldCardContainer flex alignCenter justifyCenter flex-col">
                <h3>
                  Gold Plan{" "}
                  <i
                    className="fa-solid fa-circle-info button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setGoldDisplay(e),
                        goldDisplay,
                      )
                    }
                  ></i>
                </h3>
                <img
                  src={Assets.goldCard}
                  alt="generic business gold credit card"
                  onClick={() =>
                    toggleDisplay(
                      (e: boolean) => setGoldDisplay(e),
                      goldDisplay,
                    )
                  }
                />
                {Button({
                  text: "Show Gold Plan Payment Form",
                  handleButtonClick: () =>
                    toggleDisplay(
                      (e: boolean) => setGoldFinanceDisplay(e),
                      goldDisplay,
                    ),
                })}
                <p
                  className={`${
                    goldDisplay ? "" : "displayNone"
                  } clearButton flex flex-col alignStart`}
                >
                  <i
                    className="fa-solid fa-xmark button"
                    onClick={() =>
                      toggleDisplay(
                        (e: boolean) => setGoldDisplay(e),
                        goldDisplay,
                      )
                    }
                  ></i>
                  $199/month includes 12 services/year (Gold + Air Conditioning
                  Service, Wheel Alignment)
                </p>
              </div>
            </section>
          </section>

          <section>
            <h2>Pay Later</h2>

            <div className="flex justifyBetween alignCenter">
              <h3>
                Book now and pay later! Schedule your appointment and pay within
                30 days after service completion.
              </h3>

              {ButtonLink({ domain: "/reservation", text: "Make Reservation" })}
            </div>
          </section>

          <section className="textAlignRight">
            <h2>Deferred Payments:</h2>

            <div className="flex justifyBetween alignCenter">
              {ButtonLink({
                domain: "/estimate",
                text: "Estimate Car Service",
              })}

              <h3>
                Get your car serviced today and defer payments for up to 45
                days.
              </h3>
            </div>
          </section>

          <section>
            <h3>
              At AutoAligners, we value your loyalty. Keep booking with us to
              unlock more exciting rewards and discounts!.
            </h3>
            <div className="flex justifyBetween alignContent">
              <div className="flex flex-col">
                <p>
                  Please note that the above numbers and content are entirely
                  fictional and should not be used as financial advice.
                </p>
                <p>
                  {" "}
                  They are provided for illustrative purposes only to
                  demonstrate how the financial options could be presented
                  within the car appointment booking application.
                </p>
              </div>

              <div className="buttonContainer flex justifyBetween alignCenter">
                {ButtonLink({
                  domain: "/reservation",
                  text: "Make Reservation",
                })}
                {ButtonLink({
                  domain: "/estimate",
                  text: "Estimate Car Service",
                })}
              </div>
            </div>

            <div></div>
          </section>
        </section>
      )}
      <Footer />
    </main>
  );
}
