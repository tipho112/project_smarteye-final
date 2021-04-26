<template>
    <div>
        <side-bar></side-bar>
        <div id='content'>
            <div class="title-wrapper">
                <span class="title"> 카메라 상태 확인 </span>
                <span class="addContainer" @click="getCount(), getTime()">
                    <i class="addBtn fa fa-retweet" aria-hidden="true"></i> 
                </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong> 전체 : </strong> {{ total }} &nbsp;&nbsp;&nbsp;
                <strong> 정상 : </strong> {{ Health_True }} &nbsp;&nbsp;&nbsp;
                <strong> 비정상 : </strong> {{ Health_False }} &nbsp;&nbsp;&nbsp;
                <strong> 최종 업데이트 :</strong> {{ update_Date }} &nbsp;&nbsp;&nbsp;
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
                                <td><strong> 카메라명 </strong></td>
                                <td><strong> Health Check </strong></td>
                                <td><strong> Health Comment </strong></td>
                                <td><strong> User Comment </strong></td>
                                <td><strong> Action </strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table1-body" v-for="(CCTV_Info, i) in CCTV_Infos" :key="i" >
                            <td></td>
                            <td><span> {{ CCTV_Info.id }} </span></td>
                            <td><span> {{ CCTV_Info.name }} </span></td>
                            <td><span> {{ CCTV_Info.health_check }} </span></td>
                            <td><span> {{ CCTV_Info.comment }} </span></td>
                            <td><span> {{ CCTV_Info.user_comment }} </span></td>
                            <td>
                                <span class="addContainer" @click="getData(), getTime()">
                                    <i class="addbtn fa fa-undo" aria-hidden="true"></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },

    mounted() {
        this.getData();
        this.getTime();
    },
    beforeUpdate() {
        this.getCount();
    },
    data() {
        return {
            CCTV_Infos:[],
            Health_Infos: [],

            total: 0,
            Health_True: 0,
            Health_False: 0,
            update_Date : ''
        }
    },
    methods: {
        getData () {
            this.$http.get('http://localhost:3000/cctv_infos')
            .then((res) => {
                this.CCTV_Infos = res.data
            })
        },
        getCount() {
            this.total =  0
            this.Health_True= 0
            this.Health_False= 0

            this.total = this.CCTV_Infos.length;

            
            for(let i = 0; i < this.CCTV_Infos.length; i++) {   
                if(this.CCTV_Infos[i].health_check == "true") {
                    this.Health_True += 1;
                }
                else if (this.CCTV_Infos[i].health_check == "false") {
                    this.Health_False += 1;
                }
            }
        },
        getTime() {
            var moment = require('moment');
            this.update_Date = moment().format('YYYY-MM-DD   h:mm:ss a');
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