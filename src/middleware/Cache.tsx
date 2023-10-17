export const cacheEmail = sessionStorage?.getItem("email")?.toLowerCase();
export const cacheEditAppointmentData = sessionStorage.getItem("editAppointmentData")
export const cacheAppointmentID =  sessionStorage.getItem("id")
export const cachePTO =  sessionStorage.getItem("PTO")

export const clearSession = sessionStorage.clear();

export function SetCacheEmail(value:string){
    sessionStorage?.setItem("email", value);
}

export function SetCacheEdit(value:string){
    sessionStorage?.setItem("editAppointmentData", value);
}

export function SetCacheID(value:string){
    sessionStorage?.setItem("id", value);
}

export function SetCachePTO(value:string){
    sessionStorage?.setItem("PTO", value);
}