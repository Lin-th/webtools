import http from "../Utils/api/http-common";
import authHeader from "./authHeader";

const user = JSON.parse(localStorage.getItem('user'));


class UploadFilesService {
  
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("files", new Blob([file], { type: "text/csv" }), file.name);

    return http.post("/repair-data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer '+user.accessToken
      },
      
      onUploadProgress,
    });
  }

  getDevice(deviceId) {
    return http.get(`/repair-data/seachDevice?deviceId=${deviceId}`,{headers:authHeader()});
  }

  getSiteInfo() {
    return http.get(`/repair-data/get-site`,{headers:authHeader()});
  }

  getInventorys(data: any) {
    console.log(user);
    
    let value = JSON.stringify({
      site: data.site,
      type: data.type,
    });

    return http.post("/repair-data/get-inventory", value, {
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
    });
  }

  getInverterTechnicalData(data: any) {
    let value = JSON.stringify({
      siteid: data.siteid,
      sn: data.sn,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    return http.post("/repair-data/get-inventory-technical-data", value, {
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
    });
  }

  getValueGrid(data: any) {
    let value = JSON.stringify({
      siteid: data.siteid,
      sn: data.sn,
      startTime: data.startTime,
      endTime: data.endTime,
    });

    return http.post("/repair-data/get-value-grid", value, {
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
    });
  }

  repairData(data: object, deviceId: string,tag:string, startTime:string) {
    let value = JSON.stringify({
      data:data,
      deviceId:deviceId,
      tag:tag,
      startTime:startTime
    });
    return http.post("/repair-data/repairWithAPI", value, {
      headers: {
        "Content-Type": "application/json",
        ...authHeader()
      },
    });
  }
}

export default new UploadFilesService();
