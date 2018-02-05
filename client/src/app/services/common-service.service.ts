import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";

import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class CommonService {
  machineName;

  constructor(private http: Http) {}

  setMachineName(machineName) {
    this.machineName = machineName;
  }

  getMachineName() {
    return this.machineName;
  }

  testConnectService(options: any): Observable<any> {
    let testConnectUrl = "./CTSimulatorTestTool/testconnection";
    return this.http
      .post(testConnectUrl, {
        host: options.host,
        port: options.port
      })
      .map((res: Response) => res.json())
      .catch(err => Observable.merge(err));
  }

  createProtocol(options: any): Observable<any> {
    let createProtocolUrl = "./CTSimulatorTestTool/createprotocol";
    let protocol = {
      epName: options.epName,
      epType: options.epType,
      epNo: options.epNo,
      patientType: options.patientType,
      organ: options.organ,
      patientPosition: options.patientPosition
    };

    let scanDetails = {
      scanMode: options.scanMode,
      kV: options.kV,
      mA: options.mA,
      range: options.range,
      collimation: options.collimation,
      pitch: options.pitch,
      rotationTime: options.rotationTime,
      ce: options.ce,
      direction: options.direction
    };

    let reconDetails = {
      sliceThickness: options.sliceThickness,
      sliceInterval: options.sliceInterval,
      urgentRecon: options.urgentRecon,
      variArea: options.variArea,
      dFOV: options.dFOV,
      centerxy: options.centerxy,
      startPosition: options.startPosition,
      endPosition: options.endPosition,
      noOfImages: options.noOfImages,
      totalImages: options.totalImages,
      ww1: options.ww1,
      wl1: options.wl1,
      ww2: options.ww2,
      wl2: options.wl2,
      ww3: options.ww3,
      wl3: options.wl3
    };

    let dose = {
      ctdi: options.ctdi,
      notificationCTDI: options.notificationCTDI,
      dlp: options.dlp,
      notificationDLP: options.notificationDLP
    };
    return this.http
      .post(createProtocolUrl, {
        protocol: protocol,
        scanDetails: scanDetails,
        reconDetails: reconDetails,
        dose: dose,
        machineName: this.machineName
      })
      .map((res: Response) => res.json())
      .catch(err => Observable.merge(err));
  }

  syncProtocol(options?: any): Observable<any> {
    let syncProtocolUrl = './CTSimulatorTestTool/sychronize';
    
    return this.http.get(syncProtocolUrl, {
        params: {
          MachineName: this.machineName
        }
      })
      .map((res: Response) => res.json())
      .catch(err => Observable.merge(err));
  }

  editProtocol(options: any, uid: any, version: any, tempUID: any): Observable<any> {
    let editProtocolUrl = "./CTSimulatorTestTool/editprotocol";
    // let protocol = new URLSearchParams();
    let protocol = {
      epName: options.epName,
      epType: options.epType,
      epNo: options.epNo,
      patientType: options.patientType,
      organ: options.organ,
      patientPosition: options.patientPosition
    };

    let scanDetails = {
      scanMode: options.scanMode,
      kV: options.kV,
      mA: options.mA,
      range: options.range,
      collimation: options.collimation,
      pitch: options.pitch,
      rotationTime: options.rotationTime,
      ce: options.ce,
      direction: options.direction
    };

    let reconDetails = {
      sliceThickness: options.sliceThickness,
      sliceInterval: options.sliceInterval,
      urgentRecon: options.urgentRecon,
      variArea: options.variArea,
      dFOV: options.dFOV,
      centerxy: options.centerxy,
      startPosition: options.startPosition,
      endPosition: options.endPosition,
      noOfImages: options.noOfImages,
      totalImages: options.totalImages,
      ww1: options.ww1,
      wl1: options.wl1,
      ww2: options.ww2,
      wl2: options.wl2,
      ww3: options.ww3,
      wl3: options.wl3
    };

    let dose = {
      ctdi: options.ctdi,
      notificationCTDI: options.notificationCTDI,
      dlp: options.dlp,
      notificationDLP: options.notificationDLP
    };
    return this.http
      .post(editProtocolUrl, {
          protocol: protocol,
          scanDetails: scanDetails,
          reconDetails: reconDetails,
          dose: dose,
          uid: uid,
          version: version,
          tempUID: tempUID,
          machineName: this.machineName
      })
      .map((res: Response) => res.json())
      .catch(err => Observable.merge(err));
  }

  transforProtocol(options?: any): Observable<any> {
    let transforProtocolUrl = './CTSimulatorTestTool/transfer';
    // let transforProtocolUrl = "../assets/synchronize.json";
    return this.http
      .get(transforProtocolUrl, {
        params: {
          MachineName: this.machineName
        }
      })
      .map((res: Response) => res.json())
      .catch(err => Observable.merge(err));
  }
}
