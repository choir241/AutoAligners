interface ICarData {
  id_: number;
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
}

export function removeDuplicates(array: ICarData[], name: "model" | "manufacturer" | "year"){
    const uniqueValues: ICarData[] = [];
    const uniqueProperties:string[] = [];

    array.forEach((data:ICarData)=>{
        if(uniqueProperties.indexOf(`${data[name]}`) === -1){
            uniqueProperties.push(`${data[name]}`);
            uniqueValues.push(data);
        }
    });

    return uniqueValues;
}