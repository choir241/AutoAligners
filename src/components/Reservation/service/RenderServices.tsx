import { services } from "../../../api/carServices";
import { DarkModeContext } from "../../../middleware/Context";
import { useContext } from "react";
import { labels } from "../../../api/labels";

export default function RenderServices({service, handleUpdateService}:{service: string, handleUpdateService: (e: string)=>void}) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`mb-4 mx-2 bg-black p-4 shadow-2xs grid ${toggleDarkMode === labels.mode.light ? labels.mode.dark : labels.mode.light}`}
    >
      {services.map((serviceElement, i) => {
        return (
          <>
            <button
              className={`${toggleDarkMode === labels.mode.light ? "lightBtn" : "darkBtn"} button text-left ${serviceElement === service ? "clicked" : ""}`}
              onClick={()=>{
                handleUpdateService(serviceElement)
              }}
              key={i}
            >
                <input
                checked={serviceElement === service}
                type = 'radio'
                className="mr-1 serviceRadio"
                />
              {serviceElement}
            </button>
          </>
        );
      })}
    </div>
  );
}
