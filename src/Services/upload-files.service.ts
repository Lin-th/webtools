import http from "../Utils/api/http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("files", new Blob([file], { type: "text/csv" }), file.name);

    return http.post("/repair-data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getDevice(deviceId) {
    return http.get(`/repair-data/seachDevice?deviceId=${deviceId}`);
  }

  getSiteInfo() {
    return http.get(`/repair-data/get-site`);
  }

  getInventorys(data: any) {
    let value = JSON.stringify({
      site: data.site,
      type: data.type,
    });

    return http.post("/repair-data/get-inventory", value, {
      headers: {
        "Content-Type": "application/json",
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
      },
    });
  }
}

export default new UploadFilesService();
