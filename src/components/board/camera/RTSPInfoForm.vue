<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
      <span class="title"> RTSP 정보 </span>
        <span class="addContainer" @click="ShowInsertModal()">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="ShowUpdateModal()">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="delRTSPInfo(checkedRTSP)">
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
                        <td><input type="checkbox" v-on:click="checkAll()" v-model="selectAll"></td>
                        <td><strong> ID </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델명 </strong></td>
                        <td><strong> Paths </strong></td>
                  </tr>
              </thead>
              <tbody>
                  <tr class="table1-body" v-for="(RTSPInfo, i) in RTSPInfos" :key="i">
                        <td></td>
                        <td><input type="checkbox" :value="RTSPInfo.id" v-model="checkedRTSP"></td>
                        <td><span> {{ RTSPInfo.id }}  </span></td>
                        <td><span> {{ RTSPInfo.manufacturer }} </span></td>
                        <td><span> {{ RTSPInfo.model }} </span></td>
                        <td><span> {{ RTSPInfo.paths }} </span></td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <RTSPInsert v-if="InsertModal" @close="InsertModal = false" v-on:close="getRTSPInfo()">
    </RTSPInsert>

    <RTSPUpdate :rtspId.sync="rtspId" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getRTSPInfo()">
    </RTSPUpdate>
</div>
</template>

<script>
import RTSPInsert from './Modals/RTSP/RTSPInsertModal.vue';
import RTSPUpdate from './Modals/RTSP/RTSPUpdateModal.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        RTSPInsert: RTSPInsert,
        RTSPUpdate: RTSPUpdate,
        SideBar
    },
    mounted() {
        this.getRTSPInfo()
    },
    data() {
        return {
            InsertModal: false,
            UpdateModal: false,
            selectAll: false,
            RTSPInfos:[],
            checkedRTSP:[],
            rtspId: '',
        }
    },
    methods: {
        checkAll() {
            this.checkedRTSP = [];
            if(!this.selectAll) {
                for(let i in this.RTSPInfos) {
                    this.checkedRTSP.push(this.RTSPInfos[i].id)
                }
            }
        },
        getRTSPInfo () {
            this.$http.get('http://localhost:3000/rtsp_infos')
            .then((res) => {
                this.RTSPInfos = res.data
            })
        },
        delRTSPInfo (checkedRTSP) {
            if(this.checkedRTSP.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedRTSP.length; i++)
                {
                    this.$http.delete('http://localhost:3000/rtsp_infos/'+checkedRTSP[i])
                .then((res) => {
                    this.getRTSPInfo()
                 })
                }
            }
            
            this.checkedRTSP = [];
        },
        ShowInsertModal() {           
                this.InsertModal = !this.InsertModal;
        },
        ShowUpdateModal() {
            if(0 == this.checkedRTSP.length)  {
                alert('RTSP를 선택해주세요.')
            }
            else if (this.checkedRTSP.length > 1) {
                alert('RTSP를 하나만 선택해주세요.')
            }
            else {
                this.rtspId = this.checkedRTSP[0];
                this.UpdateModal = !this.UpdateModal;
            }
        }
    },
    updated(){
        this.getRTSPInfo()
    }
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