<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
      <span class="title"> 카메라 목록 </span>
        <span class="addContainer" @click="ShowInsertModal()">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="ShowUpdateModal()">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="delCCTVInfo(checkedCCTV)">
            <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </span>
    </div>

    <div>
        <table class="table1">
            <colgroup>
                <col width="4%">
                <col width="1%">
            </colgroup>
                <thead>
                <tr class="table1-head-title">
                    <th></th>
                    <th><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></th>
                    <td><strong> 번호 </strong></td>
                    <td><strong> 상태 </strong></td>
                    <td><strong> 장치 이름 </strong></td>
                    <td><strong> 주소 </strong></td>
                    <td><strong> 웹 포트 </strong></td>
                    <td><strong> 서비스 포트 </strong></td>
                    <td><strong> 제조사 </strong></td>
                    <td><strong> 모델 </strong></td>
                    <td><strong> 설명 </strong></td>
                    <td><strong> 비밀번호 </strong></td>
                </tr>
                </thead>
                <tbody>
                    <tr class="table1-body" v-for="(CCTVInfo, i) in CCTVInfos" :key="i">
                        <td></td>
                        <td><input type="checkbox" :value="CCTVInfo.id" v-model="checkedCCTV"></td>
                        <td><span> {{ i+1 }}  </span></td>
                        <td>
                            <span v-if="CCTVInfo.ptz_control_usage == 1"> 사용 </span>
                            <span v-else-if="CCTVInfo.ptz_control_usage == 0"> 비사용 </span>
                        </td>
                        <td><span> {{ CCTVInfo.name }} </span></td>
                        <td><span> {{ CCTVInfo.area1 }} {{ CCTVInfo.area2 }} {{ CCTVInfo.area3 }}</span></td>
                        <td><span> {{ CCTVInfo.manage_port }} </span></td>
                        <td><span> {{ CCTVInfo.rtsp_port }} </span></td>
                        <td><span> {{ CCTVInfo.manufacturer }} </span></td>
                        <td><span> {{ CCTVInfo.model }} </span></td>
                        <td><span> {{ CCTVInfo.comment }} </span></td>
                        <td><span> {{ CCTVInfo.password }} </span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <CCTVInsert v-if="showInsert" @close="showInsert = false, getCCTVInfo()"></CCTVInsert>
    <CCTVUpdate :sendData.sync="sendData" v-if="showUpdate" @close="showUpdate = false, getCCTVInfo()"></CCTVUpdate>
</div>
</template>

<script>
import CCTVInsert from './Modals/CCTVInfo/CCTVInsertModal.vue';
import CCTVUpdate from './Modals/CCTVInfo/CCTVUpdateModal.vue';
import axios from 'axios';


import SideBar from '../../common/SideBar.vue';

export default {
        components: {
        CCTVInsert: CCTVInsert,
        CCTVUpdate: CCTVUpdate,
        SideBar,
    },
    mounted() {
        this.getCCTVInfo()
    },
    data() {
        return {
            CCTVInfos: [],
            checkedCCTV: [],
            sendData: [],
            showInsert: false,
            showUpdate: false,
            selectAll : false,
            CCTVId: ''
        }
    },
    methods: {
        getCCTVInfo () {
            axios.get('http://localhost:8888/api/cctv/list')
            .then((res) => {
                this.CCTVInfos = res.data.data
            })
        },
        delCCTVInfo (checkedCCTV) {
            if(this.checkedCCTV.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedCCTV.length; i++)
                {
                    axios.post('http://localhost:8888/api/cctv/delete', {
                        id:checkedCCTV[i]
                    })
                    .then((res) => {
                    this.getCCTVInfo()
                 })
                }
            }

            this.checkedCCTV = [];
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.CCTVInfos) {
                    this.checkedCCTV.push(this.CCTVInfos[i].id)
                }
            }
        },
        ShowInsertModal() {
                this.showInsert = !this.showInsert;
        },
        ShowUpdateModal() {
            if(0 == this.checkedCCTV.length)  {
                alert('녹화장치를 선택해주세요.')
            }
            else if (this.checkedCCTV.length > 1) {
                alert('녹화장치를 하나만 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.CCTVInfos.length; i++) {
                    if(this.checkedCCTV[0] == this.CCTVInfos[i].id) {
                        this.sendData = this.CCTVInfos[i];
                    }
                }
                this.showUpdate = !this.showUpdate;
            }
        },
    },

}
</script>


<style scoped>
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
  height: 60px;
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
  line-height: 60px;
  color: #424246;
}

.modal-table-body td input,
.modal-table-body td select {
  color: #434448;
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(110,110,110,0.4);
}
.modal-table-body td input {
    width: 440px;
}
.modal-select1 {
    width : 440px;
}
.modal-select2 {
    width : 370px;
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
