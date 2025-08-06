import ButtonText from "../Buttons/ButtonText";

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

  for (let i = 0; i <= maxNumOfElements; i += 4) {
    numbers.push(i);
  }

  return numbers.map((number) => {
    return (
      <ButtonText
        label={`${number + 1}`}
        className={number + 1 === currentPage + 1 ? "clicked" : ""}
        onClickEventHandler={() => setCurrentPage(number)}
      />
    );
  });
}
