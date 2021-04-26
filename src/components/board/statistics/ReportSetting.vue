<template>
    <div id="app">
        <side-bar></side-bar>
        <div id="content">
        <div class="title-wrapper">
          <span class="title">리포트 설정</span>
          <span class="addContainer" v-on:click="addReportBtn">
              <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
          </span>
          <span class="addContainer" v-on:click="modifyReportBtn(selected.length, selected, getReportSet)">
              <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </span>
          <span class="addContainer" v-on:click="deleteReportBtn(selected)">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
          </span>
      </div>


        <!-- 리포트 설정 추가 팝업 -->
        <Modal v-if="reportSetModal" v-on:close="reportSetModal = false">
            <div class="modal-header" slot="header">
              <span class="modal-header-title">리포트 추가</span>
                <i class="closeModalBtn fas fa-times" v-on:click="reportSetModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div class="modal-body-title">리포트 정보</div>
                 <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이름</td>
                        <td><input type="text" placeholder="사용자 ID"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>주기</td>
                      <td> <select class="modal-select1"  name="selectingPeriod" v-model="selectPeriod">
                        <option value="일간">일간</option>
                        <option value="월간">월간</option>
                        <option value="연간">연간</option>
                    </select>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div  slot="body">
              <div class="modal-body-title">이벤트 타입</div>
               <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이벤트 추가</td>
                        <td>
                          <select class="modal-select1" name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                        </td>
                    </tr>
                    <tr class="modal-table-body">
                      <!-- 추가 버튼???????????? -->
                      <button class="modal-groupaddBtn" v-on:click="addEvent(selectEvent)">추가</button>
                    </tr>
                    <span v-for="(event,index) in eventArr" :key="index+1">
                    {{event}}
                    <span class="eventRemove" type="button" v-on:click="removeEvent(index+1)">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span> 
                </tbody>
              </table>
            </div>

            <span slot="footer" v-on:click="reportSetModal = false">
                <button class="button-cancle" v-on:click="reportcancle">취소</button>
                <button class="button-add" v-on:click="addReport(userName,selectPeriod)" >추가</button>
            </span>
        </Modal>

        <!-- 리포트 설정 수정 팝업 -->
        <Modal v-if="reportModifyModal" v-on:close="reportModifyModal = false">
            <div class="modal-header" slot="header">
              <span class="modal-header-title">리포트 수정</span>
                <i class="closeModalBtn fas fa-times" v-on:click="reportModifyModal = false" aria-hidden="true"></i>
            </div>
            <div slot="body">
                <div class="modal-body-title">리포트 정보</div>
                 <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이름</td>
                        <td><input type="text" v-model="userName" placeholder="사용자 ID"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>주기</td>
                      <td> <select class="modal-select1"  name="selectingPeriod" v-model="selectPeriod">
                        <option value="일간">일간</option>
                        <option value="월간">월간</option>
                        <option value="연간">연간</option>
                    </select>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div  slot="body">
              <div class="modal-body-title">이벤트 타입</div>
               <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>이벤트 추가</td>
                        <td>
                          <select class="modal-select1" name="selectingEvent" v-model="selectEvent">
                        <option v-for="(event, index) in events" :key="index" >
                            {{ event.eventName }}
                        </option>
                    </select>
                        </td>
                    </tr>
                    <tr class="modal-table-body">
                      <!-- 추가 버튼???????????? -->
                      <button class="modal-groupaddBtn" v-on:click="addEvent(selectEvent)">추가</button>
                    </tr>
                    <span v-for="(event,index) in eventArr" :key="index+1">
                    {{event}}
                    <span class="eventRemove" type="button" v-on:click="removeEvent(index+1)">
                        <i class="closeBtn fas fa-times"></i>
                    </span>
                </span> 
                </tbody>
              </table>
            </div>

            <span slot="footer" v-on:click="reportModifyModal = false">
                <button class="button-cancle" v-on:click="reportcancle">취소</button>
                <button class="button-add" v-on:click="modifyReport(selected,userName,selectPeriod)" >수정</button>
            </span>
        </Modal>

        <table class="table1">
           <colgroup>
                <col width="4%">
                <col width="1%">
                <col width="26%">
                <col width="26%">
                <col width="26%">
                <col width="17%">
            </colgroup>
            <thead>
                <tr class="table1-head-title">
                    <th></th>
                    <th><input type="checkbox" v-model="selectAll" v-on:click="select"></th>
                    <th>이름</th>
                    <th>주기</th>
                    <th>이벤트 타입</th>
                    <th></th>
                </tr>
                <!-- <tr v-for="val in values" :key="val">
                    <td><input type="checkbox" /></td>
                    <td>{{val.name}}</td>
                    <td>{{val.period}}</td>
                    <td>{{val.eType}}</td>
                    <td>{{val.download}}</td>
                </tr> -->
                <!-- <tr class="table1-body">
                    <td></td>
                    <th><input type="checkbox" v-model="selectAll" v-on:click="select"></th>
                    <th>이름</th>
                    <th>주기</th>
                    <th>이벤트 타입</th>
                    <th></th>
                </tr> -->
                <tr class="table1-body" v-for="(val,i) in getReportSet" :key="i">
                    <td></td>
                    <td><input type="checkbox" :value="val.id" v-model="selected" ></td>
                    <td>{{val.eventType[0]}}보고</td>
                    <td @click="update">{{val.cycle}}</td>
                    <td >{{val.eventType[0]}}</td>
                    <td><button>다운로드</button></td>
                </tr>
            </thead>
        </table>
        </div>
    </div>
</template>

<script>
import Modal from '../../../common/Modal'
import SideBar from '../../common/SideBar.vue'
export default {
    data(){
        return{
            // report data
            //  values:[
            //      {name:"화재 보고", period:"월간", eType:"화재", download:"□"},
            //      {name:"화재 보고", period:"주간", eType:"화재", download:"□"}
            //  ],
            // addReport data
            reportSetModal:false,
            reportModifyModal:false,
            getReportSet:[],
            selected:[],
            selectAll:false,
            selectGroup:'',
            userName:'',
            selectPeriod:'daily',
            selectEvent:'움직임',
            eventArr:[],
            events:[
                {eventName:"움직임"},
                {eventName:"배회"},
                {eventName:"침입"},
                {eventName:"쓰러짐"},
                {eventName:"화재"},
                {eventName:"연기"},
                {eventName:"싸움"},
                {eventName:"주차"},
                {eventName:"정차"},               
                {eventName:"수위감시"}
            ],
            
            updateKey:0,
            showUpdate:0
        }
    },
    methods:{
        getReportSetToJson(){
            this.$http.get('http://localhost:3000/report_setting')
            .then((res) => {
                console.log('getdata: ', res.data)
                this.getReportSet = res.data
            })
        },        
        deleteReportBtn(selected){
            for(let i=0; i<selected.length; i++){
                this.$http.delete('http://localhost:3000/report_setting/'+selected[i])
                .then((res) => {
                    this.getReportSetToJson()
                })
            }
            this.selected=[]
        },
        select() {
         this.selected = [];
            if(!this.selectAll){
                for(let i in this.getReportSet){
                    this.selected.push(this.getReportSet[i].id)
                }
            }
      },     
        addEvent(event){
            if(!this.isExistEvent(event)){
                this.eventArr.push(event)
            }else{
                alert("이미 선택한 이벤트 입니다.")
            }
        },
        isExistEvent(event){
            let returnFlag = false;
            for(let i in this.eventArr){
                if(this.eventArr[i] == event){
                    returnFlag = true;
                }
            }
            console.log(returnFlag);
            return returnFlag;
        },
        removeEvent(index){
            this.eventArr.splice(index-1,1);
            console.log("Adfa")
        },
        addReportBtn(){
            this.reportSetModal = !this.reportSetModal;
        },
        addReport(userName,selectPeriod){
            this.$http.post('http://localhost:3000/report_setting',{
                userName:userName,
                cycle:selectPeriod,
                eventType:this.eventArr,
            }).then((res) => {
                this.getReportSet.push(res.data);
                this.userName = '',
                this.cycle = '',
                this.eventType=[]
            })
            this.reportSetModal = !this.reportSetModal;
        },
        modifyReportBtn(length, id, getReportSet){
             if(length==0){
                alert("수정하실 사용자를 체크해 주세요")
            }else if(length==1){
                for(let i=0; i<getReportSet.length; i++){
                    if(id==getReportSet[i].id){
                        this.userName=getReportSet[i].userName
                        this.selectPeriod=getReportSet[i].cycle
                        this.eventArr=getReportSet[i].eventType
                    }
                }
                this.reportModifyModal = !this.reportModifyModal;
            }else{
                alert("수정하실 리포트를 1명만 체크해 주세요")
            }
        },
        modifyReport(id,userName,selectPeriod){
            // if(id && firstName && lastName && team && position && role){
                this.$http.patch('http://localhost:3000/report_setting/'+id,{
                    userName:userName,
                    cycle:selectPeriod,
                    eventType:this.eventArr
                }).then(res => {
                    console.log(this);
                    console.log(res);
                    this.updateBtn++;
                    this.getReportSet()

                })
                    this.userName = '',
                    this.selectPeriod = '',
                    this.eventArr= []
            // }
            this.selected=[]
            this.reportModifyModal = !this.reportModifyModal;
            this.updateRerender();
            this.update()
            // () ;
        },
        reportcancle(){
            this.userName = '',
            this.selectPeriod=[],
            this.eventArr=[];
            if(this.reportModifyModal == true){
                this.reportModifyModal = false;
            }else if(this.reportSetModal == true){
                this.reportSetModal = false;
            }
        },

        updateRerender(){
            console.log("뿌엥");
            console.log(this.updateKey);
            this.updateKey += 1;
            console.log(this.updateKey);
        },
        update(){
            this.$forceUpdate();
        }

    },
    components:{
        Modal: Modal,
        SideBar
    },
    mounted() {
        this.getReportSetToJson()
    },
    computed:{
        updateBtn(){
            return this.showUpdate;
        }
    },
    updated(){
        this.getReportSetToJson()
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