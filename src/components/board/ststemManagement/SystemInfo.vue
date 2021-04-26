<template>
    <div id="app">
    <side-bar></side-bar>
    <div id="content">
        <div class="title-wrapper">
            <span class="title"> 시스템 정보 </span>
        </div>

        <div class="testDiv">
            <table class="table1">
                <colgroup>
                <col width="4%">
                <col width="1%">
                </colgroup>
                <thead>
                    <tr class="table1-head-title">
                        <td><strong> 언어 설정</strong></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table1-body">
                    <label for="lang-select">언어</label>
                    <select name="lang-select">
                        <option value="ko">Korean</option>
                    </select>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="testDiv">
            <span>
            <table class="table1">
                <colgroup>
                <col width="4%">
                <col width="1%">
                </colgroup>
                <thead>
                    <tr class="table1-head-title">
                        <td><strong> 버전 정보 </strong></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table1-body">
                    <label for="ver-select"> API 설정</label>
                    <select name="ver-select">
                        <option value="1.1">1.1</option>
                    </select>
                    </tr>
                </tbody>
            </table>
            </span>
        </div>

        <div class="testDiv">
            <table class="table1">
                <colgroup>
                <col width="4%">
                <col width="1%">
                </colgroup>
                <thead>
                    <tr class="table1-head-title">
                        <td><strong> 시스템관리 </strong></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table1-body">
                    <label for="ver-select">  </label>
                        <button v-on:click="resetBtn"> 설정 초기화 </button>
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
.title{
    color:#1E1E1E;
    font-weight: 900;
    margin: 1.5rem 0 1.5rem;
}

#testDiv {
    text-align:left;
}

#content {
    text-align:left;
}
</style>