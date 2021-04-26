<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
      <span class="title"> 고장 리포트</span>
        <span class="addContainer" @click="ShowModal()">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
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
                        <td><strong> ID </strong></td>
                        <td><strong> 보고자 </strong></td>
                        <td><strong> 보고일자 </strong></td>
                        <td><strong> 장치 이름 </strong></td>
                        <td><strong> 주소(시/군/구) </strong></td>
                        <td><strong> 보고 사유 </strong></td>
                        <td><strong> 관리자 코멘트 </strong></td>
                        <td><strong> 수리 현황 </strong></td>
                  </tr>
              </thead>
              <tbody v-for="(CCTV_Info, i) in CCTV_Infos" :key="i">
                  <tr class="table1-body" v-if="CCTV_Info.ptz_control_usage == 0">
                        <td></td>
                        <td><span> {{ CCTV_Info.id }} </span></td>
                        <td><span> {{ CCTV_Info.reporter }} </span></td>
                        <td><span> {{ CCTV_Info.updated_at }} </span></td>
                        <td><span> {{ CCTV_Info.name }} </span></td>
                        <td><span> {{ CCTV_Info.area1 }} {{ CCTV_Info.area2 }} {{ CCTV_Info.area3 }} </span></td>
                        <td><span> {{ CCTV_Info.reporter_comment }} </span></td>
                        <td><span> {{ CCTV_Info.comment }} </span></td>
                        <td><button :value="CCTV_Info.id" @click="fixCCTV(CCTV_Info.id)"> 수리완료 </button></td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>

    <CommentModal v-if="showModal" @close="showModal = false">
    </CommentModal>
</div>
</template>

<script>
import CommentModal from './Modals/FixReport/CommentModal.vue';
import SideBar from '../../common/SideBar.vue';

export default {
    components: {
        CommentModal: CommentModal,
        SideBar
    },
    created() {
        this.getData()
    },
    data() {
        return {
            CCTV_Infos: [],
            Filter_CCTVs: [],

            showModal: false
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                // console.log(res.data)
                this.CCTV_Infos = res.data
            })
        },
        filterData () {
            for(let i = 0; i < this.CCTV_Infos.length; i++) {
                if(this.CCTV_Infos[i].ptz_control_usage == 0) {
                    this.Filter_CCTVs.push({
                        id : this.CCTV_Infos[i].id,
                        updated_at : this.CCTV_Infos[i].updated_at,
                        name : this.CCTV_Infos[i].name,
                        area1 : this.CCTV_Infos[i].area1,
                        area2 : this.CCTV_Infos[i].area2,
                        area3 : this.CCTV_Infos[i].area3,
                        reporter_comment : this.CCTV_Infos[i].reporter_comment,
                        comment : this.CCTV_Infos[i].comment
                    })
                }
            }
        },
        fixCCTV(id) {
            this.$http.patch('http://localhost:3000/cctv_infos/'+ id, {
                ptz_control_usage: 1
            })
            .then((res) => {
                // this.Filter_CCTVs.push(res.data);
            })

            this.CCTV_Infos =  [],

            this.getData();
        },
        ShowModal() {
            this.showModal = !this.showModal;
        }
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
