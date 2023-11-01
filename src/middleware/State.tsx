import {create} from "zustand"
import {produce} from "immer"
import {State, Action, defaultCardInfo} from "./Types"
import {CardInfo} from "../middleware/Interfaces"

export const useStore = create<State & Action>(
    (set)=>({
        cardInfo: defaultCardInfo,
        setCardInfo: (cardInfo: CardInfo)=>{
            set(
                produce(
                    (state)=>{
                        state.cardInfo = cardInfo
                    }
                )
            )
        }
    })
);