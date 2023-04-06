import { Response } from "express";

namespace MakeResponse{

  export const success = (res : Response, statusCode : number, message : string, data? : any) => {
    if(data){
      res.status(statusCode).json({
        status: "success",
        message,
        data
      })
    }
    else{
      res.status(statusCode).json({
        status: "success",
        message,
      })
    }
    
  }

}

export default MakeResponse;