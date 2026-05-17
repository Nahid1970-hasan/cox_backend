import axios from "axios";
import { config } from "../config/config";
import { getPublicIp } from "./publicIp";

export const socket = {
  post: async (body) => {
    const { URL, path } = config;
    console.log(body);
    body.data.public_ip = (await getPublicIp()) || "";
    body.data.login_id = localStorage.getItem("login_id") || "";
    body.data.login_type = localStorage.getItem("login_type") || "";
    body.data.login_type=="TEN" && (body.data.tenderer_code = localStorage.getItem("tenderer_code") || ""); 
    body.data.session_key = localStorage.getItem("session_key") || "";
    //"session_key": "{{session_key}}"
    return axios
      .post(URL + path, body, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .then((d) => d.data)
      .then((d) => { 
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  upload: async (data) => {  
    const { URL, path } = config; 
    data.append('public_ip', (await getPublicIp()) || "");
    data.append('login_id', localStorage.getItem("login_id") || "");
    data.append('login_type', localStorage.getItem("login_type") || "");
    data.append('tenderer_code', localStorage.getItem("tenderer_code") || "");
    data.append('session_key', localStorage.getItem("session_key") || "");  
    !data.get("tender_id") && (data.append('tender_id', localStorage.getItem("tender_id") || ""));
    let configs = {
      method: 'post',
      maxBodyLength: Infinity,
      url: URL + path+'/upload',
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      data : data
    };  
    return axios.request(configs)
      .then((d) => d.data)
      .then((d) => {
        console.log(d)
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  uploadDoc: async (data) => {  
    const { URL, path } = config; 
    data.append('public_ip', (await getPublicIp()) || "");
    data.append('login_id', localStorage.getItem("login_id") || "");
    data.append('login_type', localStorage.getItem("login_type") || "");
    data.append('tenderer_code', localStorage.getItem("tenderer_code") || "");
    data.append('session_key', localStorage.getItem("session_key") || ""); 
    !data.get("tender_id") && (data.append('tender_id', localStorage.getItem("tender_id") || ""));
    let configs = {
      method: 'post',
      maxBodyLength: Infinity,
      url: URL + path+'/upload-doc',
      headers: { 
        "Content-Type": "multipart/form-data",
      },
      data : data
    };  
    console.log(data.get("file"))
    console.log(data.get("file_value"))
    return axios.request(configs)
      .then((d) => d.data)
      .then((d) => {
        console.log(d)
        if (d.tag == "error") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 400;
          CustormError.name = "failed";
          throw CustormError;
        } else if (d.tag == "unauthorized") {
          let CustormError = new Error(d.data.msg);
          CustormError.code = 401;
          CustormError.name = "unauthorized";
          throw CustormError;
        } else {
          return d;
        }
      });
  },
  get: (getPath) => {
    const { URL, path } = config;
    return axios
      .get(URL + path + getPath)
      .then((d) => JSON.parse(d.data.replaceAll("@#", ":")));
  },
};
