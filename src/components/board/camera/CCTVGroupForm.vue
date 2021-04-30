<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
        <span class="title"> CCTV 그룹 </span>
        <select v-model="Group_Name">
            <option disabled value=""> 그룹을 선택해 주세요 </option>
            <option v-for="(Group_Info, i) in Group_Infos" :key="i">
                <span :value="Group_Info.id" > {{ Group_Info.name }} </span>
            </option>
        </select> &nbsp;&nbsp;&nbsp;&nbsp;
        <span class="addContainer" @click="ShowGroupUpdateModal()">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="getCCTVInfos()">
            <i class="addBtn fa fa-retweet" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="loadCCTVinGroup()">
            <i class="addBtn fa fa-search" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="insertGroupID()">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="delCCTVGroup()">
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
                    <td><strong> 사용 </strong></td>
                    <td><strong> 장치 이름 </strong></td>
                    <td><strong> 모델명 </strong></td>
                    <td><strong> 주소 </strong></td>
                    <td><strong> 웹 포트 </strong></td>
                    <td><strong> 서비스 포트 </strong></td>
                    <td><strong> 제조사 </strong></td>
                    <td><strong> 장치 종류 </strong></td>
                  </tr>
              </thead>
              <tbody>
                    <tr class="table1-body" v-for="(CCTV_Info, i) in CCTV_Infos" :key="i">
                        <td></td>
                        <td><input type="checkbox" :value="CCTV_Info.id" v-model="checkedCCTV"></td>
                        <td><span> {{ i+1 }}  </span></td>
                        <td>
                            <span v-if="CCTV_Info.ptz_control_usage == 1"> 정상 </span>
                            <span v-else-if="CCTV_Info.ptz_control_usage == 0"> 고장 </span>
                        </td>
                        <td><span> {{ CCTV_Info.name }} </span></td>
                        <td><span> {{ CCTV_Info.model }} </span></td>
                        <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }}</span></td>
                        <td><span> {{ CCTV_Info.manage_port }} </span></td>
                        <td><span> {{ CCTV_Info.rtsp_port }} </span></td>
                        <td><span> {{ CCTV_Info.manufacturer }} </span></td>
                        <td><span> {{ CCTV_Info.camera_type }} </span></td>
                    </tr>
              </tbody>
          </table>
      </div>
    </div>

    <InsertGroupId :group_id.sync="group_id" v-if="InsertModal" @close="InsertModal = false" v-on:close="loadCCTVinGroup()">
    </InsertGroupId>
    <GroupUpdate :groupData.sync="groupData" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getGroupInfos(), getCCTVInfos()">
    </GroupUpdate>
</div>
</template>

<script>
import GroupUpdate from './Modals/CCTVGroup/UpdateModal.vue';
import InsertGroupId from './Modals/CCTVGroup/InsertGroupId.vue';
import SideBar from '../../common/SideBar.vue';

import axios from 'axios';

export default {
    mounted() {
        this.getGroupInfos();
        this.getCCTVInfos();
    },
    data() {
        return {
            Group_Infos:[],
            CCTV_Infos:[],
            checkedCCTV: [],
            selectAll : false,
            Group_Name : '',
            groupData : [],

            sendData: [],
            UpdateModal:false,
            InsertModal: false,
        }
    },
    methods: {
        getGroupInfos () {
            axios.get('http://localhost:8888/api/cctvgroup/list')
            .then((res) => {
                this.Group_Infos = res.data.data
            })
        },
        getCCTVInfos() {
            axios.get('http://localhost:8888/api/cctv/list')
            .then((res) => {
                this.CCTV_Infos = res.data.data
            })

            this.Group_Name = '';
        },
        makeGroup() {
            this.$http.post('http://localhost:3000/cctvgroup_infos', {
                name: '새 그룹'
            })
            .then((res) => {
                this.Group_Infos.push(res.data);
            })

            this.getGroupInfos();
        },
        delGroup () {
            if(this.Group_Name == '')  {
                alert('그룹을 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name) {
                        this.$http.delete('http://localhost:3000/cctvgroup_infos/'+this.Group_Infos[i].id)
                        .then((res) => {
                            this.getGroupInfos();
                        })
                    }
                }
            }
        },
        ShowGroupUpdateModal() {
            if(this.Group_Name == '')  {
                alert('그룹을 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name) {
                        this.groupData = this.Group_Infos[i]
                    }
                }
                this.UpdateModal = !this.UpdateModal;
            }
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.CCTV_Infos) {
                    this.checkedCCTV.push(this.CCTV_Infos[i].id)
                }
            }
        },
        loadCCTVinGroup() {
            if(this.Group_Name == '')  {
                alert('그룹을 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name) {
                        this.sendData = this.Group_Infos[i]
                    }
                }
            }
            console.log(this.group_id);
            if(this.CCTV_Infos.length > 0) {
                this.CCTV_Infos = [];
            }

            axios.post('http://localhost:8888/api/cctvgroup/listingroup', {
                id: this.sendData.id,
                name: this.sendData.name
            })
            .then((res) => {
                this.CCTV_Infos = res.data.data
            })
        },
        insertGroupID() {
            if(this.Group_Name == '')  {
                alert('그룹을 선택해주세요.')
            }
            else {
                for(let i = 0; i < this.Group_Infos.length; i++) {
                    if(this.Group_Infos[i].name == this.Group_Name) {
                        this.group_id = this.Group_Infos[i].id
                    }
                }
                this.InsertModal = !this.InsertModal;
            }
        },
        delCCTVGroup() {
            if(this.Group_Name == '')  {
                alert('그룹을 선택해주세요.')
                this.getCCTVInfos();
            }
            else {
                for(let i = 0; i < this.checkedCCTV.length; i++) {
                    this.$http.patch('http://localhost:3000/cctv_infos/'+this.checkedCCTV[i], {
                        group_id: 0
                    })
                    .then((res) => {
                        this.loadCCTVinGroup();
                    })
                }
                checkedCCTV = [];
            }
        }
    },
    components: {
        GroupUpdate: GroupUpdate,
        InsertGroupId: InsertGroupId,
        SideBar
    }
}
</script>


<style lang="css">
/* .closeModalBtn {
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
  width: 300px;
  height: 700px;
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
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}

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
} */
</style>
<style scoped>
/* .modal-container {
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

.modal-table-body td option {
    color: #434448;
    height: 36px;
    border-radius: 4px;
    border: 1px solid rgba(110,110,110,0.4);
}

.modal-table-body td input {
    width: 150px;
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
} */
</style>