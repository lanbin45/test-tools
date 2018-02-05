import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common-service.service";
// import { NzMessageService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { NzModalService } from "ng-zorro-antd";

const ButtonLabels1 = ["同步", "下一个"];
const ButtonLabels2 = ["获取转送协议", "下一个"];
const ScannerNameGroup1 = [
  { value: "Aquilion_MN1", label: "Aquilion_MN1" },
  { value: "Aquilion_MN2", label: "Aquilion_MN2" }
];
const ScannerNameGroup2 = [
  { value: "AquilionPrime_MN1", label: "AquilionPrime_MN1" },
  { value: "AquilionPrime_MN2", label: "AquilionPrime_MN2" }
];

@Component({
  selector: "app-protocol-details",
  templateUrl: "./protocol-details.component.html",
  styleUrls: ["./protocol-details.component.css"]
})
export class ProtocolDetailsComponent implements OnInit {
  validateForm: FormGroup;
  validateForm1: FormGroup;
  // validateForm2: FormGroup;
  placeHolder;
  scannerName;
  scannerOptions = [];
  modelName;
  modelOptions = [];
  epTypeOptions = [];
  patientTypeOptions = [];
  organOptions = [];
  patientPositionOptions = [];
  scanModeOptions = [];
  kVOptions = [];
  mAOptions = [];
  collimationOptions = [];
  pitchOptions = [];
  ceOptions = [];
  directionOptions = [];
  rotationTimeOptions = [];
  sliceThicknessOptions = [];
  sliceIntervalOptions = [];
  urgentReconOptions = [];
  variAreaReconOptions = [];
  dFOVOptions = [];
  defaultForm = {};
  buttonLabel1;
  buttonLabel2;
  disabledButton1;
  disabledButton2;
  buttonAction;
  protocolIndex;
  protocolLen;
  hiddenActionState;
  protocols = [];
  uid;
  version;
  tempUID;
  epState;
  otherState;
  connectState;

  constructor(
    private commonService: CommonService,
    // private _message:NzMessageService,
    private formbuilder: FormBuilder,
    private _message: NzModalService
  ) {}

  ngOnInit() {
    this.modelOptions = [
      { value: "TSX-301C", label: "TSX-301C" },
      { value: "TSX-303A", label: "TSX-303A" }
    ];
    this.modelName = this.modelOptions[0].value;    
    this.scannerOptions = ScannerNameGroup1;
    this.scannerName = this.scannerOptions[0].value;
    this.commonService.setMachineName(this.scannerName);
    this.connectState = true;
    // this.connectState = false;// for Debug

    let host = "localhost";
    let port = "9815";
    this.validateForm1 = this.formbuilder.group({
      host: [host, [Validators.required]],
      port: [port, [Validators.required]]
    });

    // button
    this.buttonLabel1 = "同步";
    this.buttonLabel2 = "获取转送协议";
    //sync text
    this.hiddenActionState = false;

    this.epState = false;
    this.otherState = false;

    // protocol
    this.epTypeOptions = [
      { value: "User", label: "User" },
      { value: "Service", label: "Service" }
    ];
    let epType = this.epTypeOptions[0].value;
    let epNo = "001";
    this.patientTypeOptions = [
      { value: "Adult", label: "Adult" },
      { value: "Child", label: "Child" },
      { value: "Trauma", label: "Trauma" }
    ];
    let patientType = this.patientTypeOptions[0].value;
    this.organOptions = [
      { value: "Head", label: "Head" },
      { value: "Neck", label: "Neck" },
      { value: "Chest", label: "Chest" },
      { value: "Abdomen", label: "Abdomen" },
      { value: "Pelvis", label: "Pelvis" },
      { value: "Leg", label: "Leg" },
      { value: "Arm", label: "Arm" },
      {
        value: "Chest, Abdomen and Pelvis",
        label: "Chest, Abdomen and Pelvis"
      },
      { value: "Entire Body", label: "Entire Body" }
    ];
    let organ = this.organOptions[0].value;
    this.patientPositionOptions = [
      { value: "SU", label: "SU" },
      { value: "RL", label: "RL" },
      { value: "PR", label: "PR" },
      { value: "LL", label: "LL" }
    ];
    let patientPosition = this.patientPositionOptions[0].value;

    // scan Details
    this.scanModeOptions = [
      { value: "Helical", label: "Helical" },
      { value: "S&S", label: "S&S" },
      { value: "Volume", label: "Volume" }
    ];
    let scanMode = this.scanModeOptions[0].value;
    let range = "200";
    this.kVOptions = [
      { value: "80", label: "80" },
      { value: "120", label: "120" },
      { value: "135", label: "135" },
      { value: "160", label: "165" }
    ];
    let kV = this.kVOptions[0].value;
    this.mAOptions = [
      { value: "50", label: "50" },
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "300", label: "300" }
    ];
    let mA = this.mAOptions[0].value;
    this.collimationOptions = [
      { value: "5", label: "5" },
      { value: "10", label: "10" },
      { value: "30", label: "30" },
      { value: "40", label: "40" },
      { value: "50", label: "50" },
      { value: "100", label: "100" },
      { value: "200", label: "200" }
    ];
    let collimation = this.collimationOptions[0].value;
    this.pitchOptions = [
      { value: "0.1", label: "0.1" },
      { value: "0.5", label: "0.5" },
      { value: "1", label: "1" },
      { value: "1.5", label: "1.5" }
    ];
    let pitch = this.pitchOptions[0].value;
    this.ceOptions = [
      { value: "ON", label: "ON" },
      { value: "OFF", label: "OFF" }
    ];
    let ce = this.ceOptions[0].value;
    this.directionOptions = [
      { value: "IN", label: "IN" },
      { value: "OUT", label: "OUT" }
    ];
    let direction = this.directionOptions[0].value;
    this.rotationTimeOptions = [
      { value: "0.5", label: "0.5" },
      { value: "0.75", label: "0.75" },
      { value: "1", label: "1" },
      { value: "2", label: "2" }
    ];
    let rotationTime = this.rotationTimeOptions[0].value;
    // recon. details
    this.sliceThicknessOptions = [
      { value:"3", label: "3" },
      { value: "5", label: "5" },
      { value: "7", label: "7" },
      { value: "10", label: "10" }
    ];
    let sliceThickness = this.sliceThicknessOptions[0].value;
    this.sliceIntervalOptions = [
      { value: "3", label: "3" },
      { value: "5", label: "5" },
      { value: "7", label: "7" },
      { value: "10", label: "10" }
    ];
    let sliceInterval = this.sliceIntervalOptions[0].value;
    this.urgentReconOptions = [
      { value: "ON", label: "ON" },
      { value: "OFF", label: "OFF" }
    ];
    let urgentRecon = this.urgentReconOptions[0].value;
    this.variAreaReconOptions = [
      { value: "YES", label: "YES" },
      { value: "NO", label: "NO" }
    ];
    let variArea = this.variAreaReconOptions[0].value;
    this.dFOVOptions = [
      { value: "200", label: "200" },
      { value: "300", label: "300" },
      { value: "400", label: "400" },
      { value: "500", label: "500" },
      { value: "600", label: "600" }
    ];
    let dFOV = this.dFOVOptions[0].value;
    this.defaultForm = {
      // protocol
      epName: null,
      epType: epType,
      epNo: null,
      patientType: patientType,
      organ: organ,
      patientPosition: patientPosition,
      // scan details
      scanMode: scanMode,
      kV: kV,
      mA: mA,
      range: range,
      collimation: collimation,
      pitch: pitch,
      rotationTime: rotationTime,
      ce: ce,
      direction: direction,
      // recon. details
      sliceThickness: sliceThickness,
      sliceInterval: sliceInterval,
      urgentRecon: urgentRecon,
      variArea: variArea,
      dFOV: dFOV,
      centerxy: "256,256",
      startPosition: "0.0",
      endPosition: "200.0",
      noOfImages: "100",
      totalImages: "100",
      ww1: "3500",
      wl1: "1600",
      ww2: "400",
      wl2: "350",
      ww3: "-600",
      wl3: "40",
      ctdi: "15",
      notificationCTDI: "70",
      dlp: "400",
      notificationDLP: "800"
    };

    var epNoRex = "^d{3,3}$";
    var numberRex = "^-?[0-9]*$";
    // var integerRex = "^-?[1-9]\d*$";
    var floatRex = "^[-]?[0-9]+([.]{1}[0-9]+){0,1}$"
    var centerxyRex = "([0-9][0-9]*)+([,]{1,1})+([0-9][0-9]*)";

    this.validateForm = this.formbuilder.group({
      // protocol
      epName: [null, [Validators.required]],
      epType: [epType, [Validators.required]],
      epNo: [
        null,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern(numberRex)
        ]
      ],
      patientType: [patientType, [Validators.required]],
      organ: [organ, [Validators.required]],
      patientPosition: [patientPosition, [Validators.required]],
      // scan details
      scanMode: [scanMode, [Validators.required]],
      kV: [kV, [Validators.required]],
      mA: [mA, [Validators.required]],
      range: [range, [Validators.required, Validators.pattern(numberRex)]],
      collimation: [collimation, [Validators.required]],
      pitch: [pitch, [Validators.required]],
      rotationTime: [rotationTime, [Validators.required]],
      ce: [ce, [Validators.required]],
      direction: [direction, [Validators.required]],
      // recon. details
      sliceThickness: [sliceThickness, [Validators.required]],
      sliceInterval: [sliceInterval, [Validators.required]],
      urgentRecon: [urgentRecon, [Validators.required]],
      variArea: [variArea, [Validators.required]],
      dFOV: [dFOV, [Validators.required]],
      centerxy: [
        "256,256",
        [Validators.required, Validators.pattern(centerxyRex)]
      ],
      startPosition: ["0.0", [Validators.required, Validators.pattern(floatRex)]],
      endPosition: ["200.0", [Validators.required, Validators.pattern(floatRex)]],
      noOfImages: ["100", [Validators.required, Validators.pattern(numberRex)]],
      totalImages: ["100", [Validators.required, Validators.pattern(numberRex)]],
      ww1: ["3500", [Validators.required, Validators.pattern(numberRex)]],
      wl1: ["1600", [Validators.required, Validators.pattern(numberRex)]],
      ww2: ["400", [Validators.required, Validators.pattern(numberRex)]],
      wl2: ["350", [Validators.required, Validators.pattern(numberRex)]],
      ww3: ["-600", [Validators.required, Validators.pattern(numberRex)]],
      wl3: ["40", [Validators.required, Validators.pattern(numberRex)]],
      ctdi: ["15", [Validators.required, Validators.pattern(floatRex)]],
      notificationCTDI: [
        "70",
        [Validators.required, Validators.pattern(floatRex)]
      ],
      dlp: ["400", [Validators.required, Validators.pattern(floatRex)]],
      notificationDLP: [
        "800",
        [Validators.required, Validators.pattern(floatRex)]
      ]
    });
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    this.commonService.setMachineName(this.scannerName);
    if (this.validateForm.valid) {
      // 1. sync
      if (this.epState) {
        this.commonService
          .editProtocol(this.validateForm.value, this.uid, (parseInt(this.version) + 1)+'.0', this.tempUID)
          .subscribe(
            res => {
              if(res.result == 0){
                this._message.success({
                  title: "成功",
                  content: "发送成功"
                });
              } else {
                this._message.error({
                  title: "错误",
                  content: `出现问题，请重试、刷新或者联系我们！(错误信息：${res.msg})`
                });
              }
              
            },
            err => {
              this._message.error({
                title: "错误",
                content: "出现问题，请重试、刷新或者联系我们！"
              });
            },
            () => console.log("null")
          );
      } else if (this.otherState) {
        // 2. transfer
        this.commonService
          .editProtocol(this.validateForm.value, this.uid, this.version, this.tempUID)
          .subscribe(
            res => {
              if(res.result == 0){
                this._message.success({
                  title: "成功",
                  content: "发送成功"
                });
              } else {
                this._message.error({
                  title: "错误",
                  content: `出现问题，请重试、刷新或者联系我们！(错误信息：${res.msg})`
                });
              }
            },
            err => {
              this._message.error({
                title: "错误",
                content: "出现问题，请重试、刷新或者联系我们！"
              });
            },
            () => console.log("null")
          );
      } else {
        // 3. send new protocol
        this.commonService.createProtocol(this.validateForm.value).subscribe(
          res => {
            if(res.result == 0){
              this._message.success({
                title: "成功",
                content: "发送成功"
              });
            } else {
              this._message.error({
                title: "错误",
                content: `出现问题，请重试、刷新或者联系我们！(错误信息：${res.msg})`
              });
            }
          },
          err => {
            this._message.error({
              title: "错误",
              content: "出现问题，请重试、刷新或者联系我们！"
            });
          },
          () => console.log("null")
        );
      }
    }
  };

  submitForm1 = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm1.controls) {
      this.validateForm1.controls[key].markAsDirty();
    }
    this.commonService.setMachineName(this.scannerName);
    if (this.validateForm1.valid) {
      this.commonService.testConnectService(this.validateForm1.value).subscribe(
        res => {
          if (res.result == 0) {
            this.connectState = false;
            this._message.success({
              title: "成功",
              content: "连接成功！"
            });
          } else {
            this._message.error({
              title: "失败",
              content: "连接失败，请重试、刷新或者联系我们！"
            });
          }
        },
        err => {
          this._message.error({
            title: "错误",
            content: "服务端出现问题，请重试、刷新或者联系我们！"
          });
        },
        () => console.log("null")
      );
    }
  };

  submitForm2 = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
  };

  resetForm($event: MouseEvent) {
    this.uid = null;
    $event.preventDefault();
    this.hiddenActionState = false;
    this.buttonLabel1 = ButtonLabels1[0];
    this.buttonLabel2 = ButtonLabels2[0];
    this.epState = false;
    this.otherState = false;
    this.validateForm.reset(this.defaultForm);
    this.protocolIndex = 1;
    this.protocols = null;
    this.disabledButton1 = false;
    this.disabledButton2 = false;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getFormControl1(name) {
    return this.validateForm1.controls[name];
  }

  syncButtonClick($event) {
    if (this.buttonLabel1 == ButtonLabels1[0]) {
      this.commonService.syncProtocol().subscribe(
        res => {
          if(res.result == 0){
            if(res.total == 0){
              this._message.info({
                title: "没有需要同步的协议",
                content: "当前协议已经是最新的了，没有需要同步的协议了！"
              })
              return;
            }
            this._message.success({
              title: "成功",
              content: "同步协议成功"
            });
            if(res.total > 1){
              this.buttonLabel1 = ButtonLabels1[1];
              this.disabledButton2 = true;
            }
            
            this.epState = true;
            this.otherState = false;
            this.protocols = res.protocols;
            this.hiddenActionState = true;
            this.buttonAction = "同步协议";
            this.protocolLen = res.total;
            this.protocolIndex = 1;
            this.validateForm.reset(this.protocols[0]);
            for (const key in this.validateForm.controls) {
              this.validateForm.controls[key].markAsPristine();
            }
            this.uid = this.protocols[0].uid;
            this.version = this.protocols[0].version;
            this.tempUID = this.protocols[0].tempUID;
          } else if (res.result == 1) {
            this._message.error({
              title: "错误",
              content: `同步出现问题，请重试、刷新或者联系我们！(错误信息：${res.msg})`
            });
          } else if (res.result == 2) {
            this._message.info({
              title: "没有需要同步的协议",
              content: "当前协议已经是最新的了，没有需要同步的协议了！"
            })
          }
        },
        err => {
          this._message.error({
            title: "错误",
            content: "同步出现问题，请重试、刷新或者联系我们！"
          });
        },
        () => console.log("null")
      );
    } else {
      this.epState = true;
      this.otherState = false;
      if (this.protocolIndex < this.protocolLen) {
        this.uid = this.protocols[this.protocolIndex].uid;
        this.version = this.protocols[this.protocolIndex].version;
        this.tempUID = this.protocols[this.protocolIndex].tempUID;
        this.validateForm.reset(this.protocols[this.protocolIndex]);
        this.protocolIndex += 1;
      }
      if (this.protocolIndex == this.protocolLen) {
        this.buttonLabel1 = ButtonLabels1[0];
        this.disabledButton2 = false;
      }
    }
  }

  getProtocols($event) {
    if (this.buttonLabel2 == ButtonLabels2[0]) {
      this.commonService.transforProtocol().subscribe(
        res => {
          if(res.result == 0){
            if(res.total == 0){
              this._message.info({
                title: "没有需要获取的转送协议了",
                content: "当前协议已经是最新的了，没有需要获取的转送协议了！"
              })
              return;
            }
            this._message.success({
              title: "成功",
              content: "获取转送协议成功"
            });

            if(res.total > 1){
              this.buttonLabel2 = ButtonLabels2[1];
              this.disabledButton1 = true;
            }
            
            this.otherState = true;
            this.epState = false;
            this.protocols = res.protocols;
            this.hiddenActionState = true;
            this.buttonAction = "转送协议";
            this.protocolLen = res.total;
            this.protocolIndex = 1;
            this.validateForm.reset(this.protocols[0]);
            for (const key in this.validateForm.controls) {
              this.validateForm.controls[key].markAsPristine();
            }
            this.uid = this.protocols[0].uid;
            this.tempUID = this.protocols[0].tempUID;
          } else if (res.result == 1) {
            this._message.error({
              title: "错误",
              content: `获取转送协议出现问题，请重试、刷新或者联系我们！(错误信息：${res.msg})`
            });
          } else if (res.result == 2) {
            this._message.info({
              title: "没有需要获取的转送协议了",
              content: "当前协议已经是最新的了，没有需要获取的转送协议了！"
            })
          }
        },
        err => {
          this._message.error({
            title: "错误",
            content: "获取转送协议出现问题，请重试、刷新或者联系我们！"
          });
        },
        () => console.log("null")
      );
    } else {
      this.otherState = true;
      this.epState = false;
      if (this.protocolIndex < this.protocolLen) {
        this.uid = this.protocols[this.protocolIndex].uid;
        this.tempUID = this.protocols[this.protocolIndex].tempUID;
        this.validateForm.reset(this.protocols[this.protocolIndex]);
        this.protocolIndex += 1;
      }
      if (this.protocolIndex == this.protocolLen) {
        this.buttonLabel2 = ButtonLabels2[0];
        this.disabledButton1 = false;
      }
    }
  }

  modelChange(){
    if(this.modelName=="TSX-301C"){
      this.scannerOptions = ScannerNameGroup1;
    } else {
      this.scannerOptions = ScannerNameGroup2;
    }
    this.scannerName = this.scannerOptions[0].value;
    this.commonService.setMachineName(this.scannerName)
  }
}
