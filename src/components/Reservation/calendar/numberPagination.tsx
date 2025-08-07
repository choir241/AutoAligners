import ButtonText from "../../Buttons/ButtonText";

export default function NumberPaignation({
  maxNumOfElements,
  currentPage,
  setCurrentPage,
}: {
  maxNumOfElements: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
}) {
  const numbers = [];

  for (let i = 0; i <= maxNumOfElements; i += 6) {
    numbers.push(i);
  }

  return numbers.map((number, i) => {
    return (
      <ButtonText
        key={i}
        label={`${number + 1}`}
        className={number + 1 === currentPage + 1 ? "clicked" : ""}
        onClickEventHandler={() => setCurrentPage(number)}
      />
    );
  });
}
