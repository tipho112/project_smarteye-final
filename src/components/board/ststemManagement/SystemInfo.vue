<template>
    <div id="app">
    <side-bar></side-bar>
    <div id="content">
      <div class="title-wrapper">
        <span class="title"> 시스템 정보 </span>
      </div>
      <div class="table2-wrapper">
            <table class="table2">
                <colgroup>
                <col width="150px">
            </colgroup>
                <thead>
                    <tr class="table2-head-title">
                        <th>언어 설정</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table2-tbody">
                      <td><label for="lang-select">언어</label></td>
                      <td>
                        <select name="lang-select">
                            <option value="ko">Korean</option>
                        </select>
                      </td>
                    </tr>
                </tbody>
            </table>

            <table class="table2">
                <colgroup>
                <col width="150px">
            </colgroup>
                <thead>
                    <tr class="table2-head-title">
                        <th>로그인 정보</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table2-tbody">
                      <td><label for="lang-select">사용자 ID</label> </td>
                      <td>
                        <input disabled placeholder="eventAdmin">
                        <button v-on:click="resetBtn"> 암호 변경 </button>
                      </td>
                    </tr>
                </tbody>
            </table>

            <table class="table2">
                 <colgroup>
                <col width="150px">
            </colgroup>
                <thead>
                    <tr class="table2-head-title">
                      <th>버전 정보</th>
                      <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table2-tbody">
                      <td><label for="ver-select"> API 설정</label></td>
                      <td>
                        <select name="ver-select">
                          <option value="1.1">1.1</option>
                        </select>
                      </td>
                    </tr>
                </tbody>
            </table>

            <table class="table2">
              <colgroup>
                <col width="150px">
            </colgroup>
                <thead>
                    <tr class="table2-head-title">
                        <th>시스템 관리</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table2-tbody">
                      <td><label for="ver-select"> 설정 초기화 </label></td>
                      <td><button v-on:click="resetBtn"> 초기화 </button></td>
                    </tr>
                </tbody>
            </table>

      </div>
</div>
</div>
</template>

<script>
import Modal from '../../../common/Modal'
import SideBar from '../../common/SideBar.vue'

export default{
    data(){
        return{
            nowPw:this.nowPw,
            chanPw:this.chanPw
        }
    },
    methods:{
        pwChangeBtn(){
            this.pwChanModal = !this.pwChanModal;
        },
        pwChan(){
            var a = this.nowPw;
            var b = this.chanPw;
            console.log(a);
            console.log(b);
            this.clearPw();
        },
        clearPw(){
            this.nowPw='';
            this.chanPw='';
        },
        resetBtn(){
            alert("초기화");
        }
    },
    components:{
        Modal: Modal,
        SideBar
    }
}
</script>

<style scoped>
.table2 {
  width: 100%;
  margin-bottom: 30px;
}
.table2-wrapper {
  margin-left: 41px;
  margin-right: 41px;
}
.table2-head-title {
  font-size: 18px;
  letter-spacing: -1px;
  line-height: 53px;
  color: #2a3144;
  font-weight: 500;
  text-align: left;
  border-bottom: 3px solid #2a3144;
}
.table2-tbody {
  height: 120px;
  border-bottom: 1px solid #aaaaaa;
}
.table2-tbody td label {
  font-size: 15px;
  letter-spacing: -1px;
  line-height: 30px;
  color: #424246;
}
.table2-tbody td select,
.table2-tbody td input {
  width: 270px;
  height: 36px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid rgba(110,110,110,0.4);
  font-size: 15px;
  letter-spacing: -1px;
  line-height: 50px;
  color: #424246;
}
.table2-tbody td button {
  width: 91px;
  height: 34px;
  border-radius: 1px;
  background-color: #818990;
  border: 1px solid #818990;
  margin-left: 10px;
  color: #f0f0f0;
}
</style>
