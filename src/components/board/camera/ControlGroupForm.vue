<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
      <span class="title"> 집중관제 그룹 </span>
        <span class="addContainer" @click="ShowInsertModal()">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" @click="delCtrlCCTV(checkedCCTV)">
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
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소 </strong></td>
                        <td><strong> 제조사 </strong></td>
                        <td><strong> 모델 </strong></td>
                  </tr>
              </thead>
              <tbody v-for="(CCTVInfo, i) in CCTVInfos" :key="i">
                  <tr class="table1-body">
                        <td></td>
                        <td><input type="checkbox" :value="CCTVInfo.id" v-model="checkedCCTV"></td>
                        <td><span> {{ CCTVInfo.id }}  </span></td>
                        <td><span> {{ CCTVInfo.name }} </span></td>
                        <td><span> {{ CCTVInfo.area1 }} {{ CCTVInfo.area2 }} {{ CCTVInfo.area3 }}</span></td>
                        <td><span> {{ CCTVInfo.manufacturer }} </span></td>
                        <td><span> {{ CCTVInfo.model }} </span></td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <InsertControl v-if="InsertModal" @close="InsertModal = false" v-on:close="getCCTVInfo()">
    </InsertControl>
</div>
</template>

<script>
import InsertControl from './Modals/CCTVControl/InsertControlModal';
import SideBar from '../../common/SideBar.vue';
import axios from 'axios';

export default {
    components:{
        InsertControl: InsertControl,
        SideBar
    },
    mounted() {
        this.getCCTVInfo();
    },
    data() {
        return {
            CCTVInfos: [],
            Control_CCTVs: [],
            checkedCCTV:[],

            InsertModal: false,
            selectAll: false
        }
    },
    methods: {
        getCCTVInfo () {
            if(this.CCTVInfos.length >= 0) {
                this.CCTVInfos = [];
            }

            axios.get('http://localhost:8888/api/cctv/cent_con')
            .then((res) => {
                this.CCTVInfos = res.data.data
            })
        },
        checkAll() {
            this.checkedCCTV = [];
            if(!this.selectAll) {
                for(let i in this.Control_CCTVs) {
                    this.checkedCCTV.push(this.Control_CCTVs[i].id)
                }
            }
        },
        delCtrlCCTV (checkedCCTV) {
            if(this.checkedCCTV.length == 0)
            {
                alert('CCTV를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedCCTV.length; i++)
                {
                    axios.post('http://localhost:8888/api/cctv/cent_con_update', {
                        id: checkedCCTV[i],
                        cent_con: false
                    })
                    .then((res) => {
                        this.CCTVInfos.push(res.data.data);
                    })
                }
            }
            this.checkedCCTV = [];

            this.getCCTVInfo();
        },
        ShowInsertModal() {
            this.InsertModal = !this.InsertModal;
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