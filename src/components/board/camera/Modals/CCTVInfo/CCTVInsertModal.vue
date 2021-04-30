<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <span class="modal-header-title"> CCTV 등록 </span>
            </slot>
          </div>
          <div class="modal-body1">
            <div class="modal-body-title"> CCTV 정보 </div>
            <table class="modal-table">
              <colgroup>
                <col width="40%">
                <col width="60%">
              </colgroup>
              <tbody>
                <tr class="modal-table-body">
                  <td> 이름 </td>
                  <td><input type="text" v-model="name" placeholder="CCTV 이름 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 사용 </td>
                  <td><input type="checkbox" v-model="check1"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 이벤트 전송 </td>
                  <td><input type="checkbox" v-model="check2"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 비상벨 </td>
                  <td><input type="checkbox" v-model="check3"/></td>
                </tr>                
                <tr class="modal-table-body">
                  <td> 설명 </td>
                  <td><input type="text" v-model="comment" placeholder="설명 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> IP 주소 </td>
                  <td><input type="text" v-model="ip_address" placeholder="IP 주소 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 지역1 </td>
                  <td><input type="text" v-model="area1" placeholder="시/도 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 지역2 </td>
                  <td><input type="text" v-model="area2" placeholder="시/군/도 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 지역3 </td>
                  <td><input type="text" v-model="area3" placeholder="읍/면/동 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 위도 </td>
                  <td><input type="text" v-model="latitude" placeholder="위도 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 경도 </td>
                  <td><input type="text" v-model="longitude" placeholder="경도 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 제조사 </td>
                  <td><input type="text" v-model="manufacturer" placeholder="제조사 입력"/></td>
                </tr>
                <tr class="modal-table-body">
                  <td> 모델명 </td>
                  <td><input type="text" v-model="model" placeholder="모델명 입력"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-body1">
            <div class="modal-body-title"> RTSP 정보 </div>
            <table class="modal-table">
              <colgroup>
                <col width="40%">
                <col width="60%">
              </colgroup>
              <tbody>
                <tr class="modal-table-body">
                  <td> RTSP Path </td>
                  <td><input type="text" v-model="rtsp_path" placeholder="RTSP Path 입력"/></td>
                </tr>
                  <tr class="modal-table-body">
                  <td> RTSP Port </td>
                  <td><input type="text" v-model="rtsp_port" placeholder="RTSP Port 입력"/></td>
                </tr>
                  <tr class="modal-table-body">
                  <td> ONVIF Path </td>
                  <td><input type="text" v-model="onvif_profile" placeholder="ONVIF Path 입력"/></td>
                </tr>
                  <tr class="modal-table-body">
                  <td> ONVIF Port </td>
                  <td><input type="text" v-model="onvif_port" placeholder="ONVIF Port 입력"/></td>
                </tr>
                  <tr class="modal-table-body">
                  <td> 사용자명 </td>
                  <td><input type="text" v-model="username" placeholder="사용자명 입력"/></td>
                </tr>
                  <tr class="modal-table-body">
                  <td> 비밀번호 </td>
                  <td><input type="text" v-model="password" placeholder="비밀번호 입력"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-body3">
            <div class="modal-body-title"> 사용 목적 </div>
            <table class="modal-table">
              <colgroup>
                <col width="40%">
                <col width="60%">
              </colgroup>
              <tbody>
                <tr class="modal-table-body">
                  <td> 사용 목적 </td>
                  <td><input type="text" v-model="camera_type" placeholder="사용목적 입력"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <span name="footer">
              <button class="button-cancle" @click="$emit('close')">취소</button>
              <button class="button-add" @click="addCCTVInfo(name, check1, check2, check3, comment, ip_address, area1, area2, area3, latitude, longitude, manufacturer, model, onvif_profile, rtsp_port, onvif_profile, onvif_port, username, password, camera_type), $emit('close')" >추가</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

export default {
  data() {
        return {
          CCTVInfos: [],
          name: '',
          check1: false,
          check2: false,
          check3: false,
          comment: '',
          ip_address: '',
          area1: '',
          area2: '',
          area3: '',
          latitude: '',
          longitude: '',
          manufacturer: '',
          model: '',
          rtsp_path: '',
          rtsp_port: '',
          onvif_profile: '',
          onvif_port: '',
          username: '',
          password: '',
          camera_type: '',

          ptz_control_usage: false,
          forwarded : false,
          emergency_bell: false,
        }
  },
  methods: {
    addCCTVInfo(name, check1, check2, check3, comment, ip_address, area1, area2, area3, latitude, longitude, manufacturer, model, rtsp_path, rtsp_port, onvif_profile, onvif_port, username, password, camera_type) {
      if(check1 == true) {
        this.ptz_control_usage = true;
      }
      else {
        this.ptz_control_usage = false;
      }

      if(check2 == true) {
        this.forwarded = true;
      }
      else {
        this.forwarded = false;
      }

      if(check3 == true) {
        this.emergency_bell = true;
      }
      else {
        this.emergency_bell = false;
      }
      
      if(name && comment && ip_address && area1 && area2 && area3 && latitude && longitude && manufacturer && model && rtsp_path && rtsp_port && onvif_profile && onvif_port && username && password && camera_type) {
        axios.post('http://localhost:8888/api/cctv/add', {
          name: name,
          ptz_control_usage: this.ptz_control_usage,
          forwarded : this.forwarded,
          emergency_bell: this.emergency_bell,
          comment: comment,
          ip_address: ip_address,
          area1: area1,
          area2: area2,
          area3: area3,
          latitude: latitude,
          longitude: longitude,
          manufacturer: manufacturer,
          model: model,
          rtsp_path: rtsp_path,
          rtsp_port: rtsp_port,
          onvif_profile: onvif_profile,
          onvif_port: onvif_port,
          username: username,
          password: password,
          camera_type: camera_type,
        })
        .then((res) => {
          this.CCTVInfos.push(res.data);
          this.CCTVInfos = [],
          this.name = '',
          this.check1 = false,
          this.check2 = false,
          this.check3 = false,
          this.comment = '',
          this.ip_address = '',
          this.area1 = '',
          this.area2 = '',
          this.area3 = '',
          this.latitude = '',
          this.longitude = '',
          this.manufacturer = '',
          this.model = '',
          this.rtsp_path = '',
          this.rtsp_port = '',
          this.onvif_profile = '',
          this.onvif_port = '',
          this.username = '',
          this.password = '',
          this.camera_type = '',
          this.forwarded = false,
          this.ptz_control_usage = false,
          this.emergency_bell = false
        })
      }
    },
  }
}
</script>


<style lang="css">
.closeModalBtn {
  color: #62acde;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 400px;
  height: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #62acde;
}
.modal-body {
  margin: 0px 0;
}
.modal-default-button {
  float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
<style scoped>
.modal-container {
  overflow-y:scroll;
}

.modal-header-title {
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 53px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 15px;
}
.modal-header {
  background-color: #0b6ad5;
  height: 50px;
  vertical-align: center;
}
.modal-body-title {
  font-size: 18px;
  letter-spacing: -1px;
  color: #2a3144;
  font-weight: 500;
  line-height:53px;
}
.modal-table {
  width: 100%;
  font-size: 15px;
  letter-spacing: -1px;
  line-height: 40px;
  color: #424246;
}

.modal-table-body td input,
.modal-table-body td select {
  color: #434448;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(110,110,110,0.4);
}
.modal-table-body td input {
    width: 150px;
}
.modal-select1 {
    width : 100px;
}
.modal-select2 {
    width : 100px;
}
.modal-groupaddBtn {
  background-color: #818990;
  border: 1px solid #818990;
  border-radius: 1px;
  width: 54px;
  height: 33px;
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
}
</style>