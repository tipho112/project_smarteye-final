<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="title-wrapper">
      <span class="title">사용자 정보</span>
        <span class="addContainer" v-on:click="addUserInfoBtn">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" v-on:click="modifyUserInfoBtn(selected.length, selected, todos)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="addContainer" v-on:click="deleteUserInfoBtn(selected)">
            <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </span>
    </div>
      <!-- 사용자 정보 추가 팝업 -->
      <Modal v-if="userInfoSetModal" v-on:close="userInfoSetModal = false">
          <div class="modal-header" slot="header">
              <span class="modal-header-title">사용자 추가</span>
              <!-- <i class="closeModalBtn fas fa-times" v-on:click="userInfoSetModal = false" aria-hidden="true"></i> -->
          </div>

          <div slot="body">
              <div class="modal-body-title">사용자 정보</div>
              <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>ID</td>
                        <td><input type="text" v-model="id" placeholder="사용자 ID 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                        <td>이름</td>
                        <td><input type="text" v-model="lastName" placeholder="사용자 이름 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>성</td>
                      <td><input type="text" v-model="firstName" placeholder="성 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>성별</td>
                      <td><select class="modal-select1" @change="setGender($event)" name="selectingGender" v-bind="gender">
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                            <option value="unknown">불명</option>
                          </select>
                      </td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>비밀번호</td>
                      <td><input type="password" v-model="inPassword" placeholder="비밀번호 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>비밀번호확인</td>
                      <td><input type="password" v-model="confirmPassword" placeholder="입력 비밀번호 확인"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>팀</td>
                      <td><input type="text" v-model="team" placeholder="팀 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>직위</td>
                      <td><input type="text" v-model="rank" placeholder="직위 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>역할</td>
                      <td><input type="text" v-model="role" placeholder="역할 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>CCTV 그룹</td>
                      <td>
                        <select class="modal-select2" name="selectingGroup" v-model="selectGroup" >
                          <option v-for="(cctvGroups,index) in CCTVGroupList" :key="index">
                            {{cctvGroups.name}}
                            </option>
                        </select>
                        <button class="modal-groupaddBtn" v-on:click="addCCTVGroup(selectGroup)">추가</button>
                      </td>
                    </tr>

                    <tr>
                      <td></td>
                      <td>
                        <span class="groupbutton" v-for="(cctv,index) in cctvGroups" :key="index">
                         {{cctv.name}}
                            <span class="cctvGroupRemove" type="button" v-on:click="removeCCTV(index)">
                                <i class="closeModalBtn fas fa-times"></i>
                            </span>
                        </span>
                        <div class="groupbutton-container">
                        <!-- <span class="groupbutton">
                            그룹1
                            <span class="groupremove" type="button">
                                <i class="closeModalBtn fas fa-times"></i>
                            </span>
                        </span>
                        <span class="groupbutton">
                           그룹1
                            <span class="groupremove" type="button">
                                <i class="closeModalBtn fas fa-times"></i>
                            </span>
                        </span>
                        <span class="groupbutton">
                            <span>그룹1</span>
                            <span class="groupremove" type="button">
                                <i class="closeModalBtn fas fa-times"></i>
                            </span>
                        </span> -->
                        </div>
                      </td>
                    </tr>
                </tbody>
              </table>
          </div>
        <span slot="footer" v-on:click="UserInfoSetModal = false">
            <button class="button-cancle" v-on:click="userInfoCancle">취소</button>
            <button class="button-add" v-on:click="addUserInfo(id,firstName,lastName,gender,team,rank,role,inPassword,confirmPassword)">추가</button>
        </span>
      </Modal>

<!-- 사용자 정보 수정 팝업 -->
    <Modal v-if="userInfoModifyModal" v-on:close="userInfoModifyModal = false">
        <div class="modal-header" slot="header">
          <span class="modal-header-title">사용자 수정</span>
            <i class="closeModalBtn fas fa-times" v-on:click="userInfoModifyModal = false" aria-hidden="true"></i>
        </div>

        <div slot="body">
              <div class="modal-body-title">사용자 정보</div>
              <table class="modal-table">
                <colgroup>
                  <col width="15%">
                  <col width="85%">
                </colgroup>
                <tbody>
                    <tr class="modal-table-body">
                        <td>ID</td>
                        <td><input type="text" v-model="id" disabled ></td>
                    </tr>
                    <tr class="modal-table-body">
                        <td>이름</td>
                        <td><input type="text" v-model="lastName" placeholder="사용자 이름 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>성</td>
                      <td><input type="text" v-model="firstName" placeholder="성 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>성별</td>
                      <td>
                    <select name="selectingGender" v-model="gender">
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="unknown">불명</option>
                    </select>
                    </td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>비밀번호</td>
                      <td><input type="password" v-model="inPassword" placeholder="비밀번호 입력"></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>비밀번호확인</td>
                      <td><input type="password" v-model="confirmPassword" placeholder="입력 비밀번호 확인"></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>팀</td>
                      <td><input type="text" v-model="team" placeholder="팀 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>직위</td>
                      <td><input type="text" v-model="rank" placeholder="직위 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>역할</td>
                      <td><input type="text" v-model="role" placeholder="역할 입력"/></td>
                    </tr>
                    <tr class="modal-table-body">
                      <td>CCTV 그룹</td>
                      <td>
                        <select class="modal-select2" name="selectingGroup" v-model="selectGroup" >
                            <option v-for="(cctvGroups,index) in CCTVGroupList" :key="index">
                                {{ cctvGroups.name }}
                            </option>
                        </select>
                        <button class="modal-groupaddBtn" v-on:click="addCCTVGroup(selectGroup)">추가</button>
                      </td>
                    </tr>

                      <td></td>
                      <td>
                        <span class="groupbutton" v-for="(cctv,index) in cctvGroups" :key="index">
                            {{cctv.name}}
                            <span class="cctvGroupRemove" type="button" v-on:click="removeCCTV(index)">
                                <i class="closeModalBtn fas fa-times"></i>
                            </span>
                        </span>
                      </td>
                </tbody>

              </table>

          </div>
        <span slot="footer" v-on:click="UserInfoModifyModal = false">
            <button class="button-cancle" v-on:click="userInfoCancle">취소</button>
            <button class="button-add" v-on:click="modifyUserInfo(id,firstName,lastName,gender,team,rank,role)">수정</button>
        </span>
    </Modal>

    <div>
          <table class="table1">
              <colgroup>
                <col width="4%">
                <col width="1%">
            </colgroup>
              <thead>
                  <tr class="table1-head-title">
                      <th></th>
                      <th><input type="checkbox" v-model="selectAll" v-on:click="select"></th>
                      <th>번호</th>
                      <th>ID</th>
                      <th>이름</th>
                      <th>팀</th>
                      <th>직위</th>
                      <th>역할</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="table1-body" v-for="(todo,i) in todos" :key="i" >
                      <td></td>
                      <td><input type="checkbox" :value="todo.id" v-model="selected"></td>
                      <td>{{ i+1 }}</td>
                      <td>{{ todo.idString }}</td>
                      <td>{{ todo.firstName }} {{ todo.lastName }}</td>
                      <td>{{ todo.team }}</td>
                      <td>{{ todo.rank }}</td>
                      <td>{{ todo.role }}</td>
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
import axios from 'axios';

export default {
    components:{
        Modal: Modal,
        SideBar
    },
   data(){
       return{
           userInfoSetModal:false,
           userInfoModifyModal:false,
           firstName:'',
           lastName:'',
           id:'',
           name:'',
           gender:'',
           inPassword:'',
           confirmPassword:'',
           team:'',
           rank:'',
           role:'',
           users:[],
           todos:[], // userlist
           CCTVGroupList:[],
           selectGroup:[],
           cctvGroups:[],
           selected:[],
           selectAll:false,
       }
   },

    methods:{
        getUserLogin(){
            this.$http.get('http://localhost:3000/userLogin')
            .then((res) => {
                console.log('getUsers:', res.data)
                this.users = res.data
            })
        },
        getTodos(){ // user list
            axios.get('http://localhost:8888/api/user/list')
            .then((res) => {
              this.todos = res.data.data
            })
        },
        getCCTVGroupList() { // get all cctv group
          axios.get('http://localhost:8888/api/cctvgroup/list')
          .then((res) => {
            this.CCTVGroupList = res.data.data
          })
        },
        getCCTVs(id){ // cctv group list with userid
            axios.post('http://localhost:8888/api/cctvgroup/listwithuser', { id : id})
            .then((res) => {
                this.cctvGroups = res.data.data
            })
        },
        select() {
          this.selected = [];
                if(!this.selectAll){
                    for(let i in this.todos){
                        this.selected.push(this.todos[i].id)
                    }
                }
        },
        addUserInfoBtn(){
            this.userInfoSetModal = !this.userInfoSetModal;
        },
        addUserInfo(id,firstName,lastName,gender,team,rank,role,inPassword,confirmPassword){
            // if(id && firstName && lastName && team && rank && role){
                if(inPassword!=confirmPassword){
                    alert("입력한 비밀번호와 확인 비밀번호가 다릅니다.")
                }else{
                    axios.post('http://localhost:8888/api/user/add',{
                        idString:id,
                        firstName:firstName,
                        lastName:lastName,
                        gender:gender,
                        encryptedPassword:inPassword,
                        team:team,
                        rank:rank,
                        role:role,
                        // cctvGroups:this.cctvGroups
                    }).then((res) => {
                        this.todos.push(res.data.data);
                        console.log(res.data.data);
                        this.id = '',
                        this.firstName = '',
                        this.lastName = '',
                        this.name = '',
                        this.gender = '',
                        this.inPassword = '',
                        this.confirmPassword ='',
                        this.team = '',
                        this.rank = '',
                        this.role = '',
                        this.cctvGroups=[];
                    })
                }
            // }
            this.userInfoSetModal = !this.userInfoSetModal;
        },
        setGender(event) {
          this.gender = event.target.value;
        },
        modifyUserInfoBtn(length, id, todos){
            if(length==0){
                alert("수정하실 사용자를 체크해 주세요")
            }else if(length==1){ // 한명만 체크 -> 수정
                for(let i=0; i<todos.length; i++){
                    if(id==todos[i].id){
                        this.id=todos[i].id;
                        this.firstName=todos[i].firstName;
                        this.lastName=todos[i].lastName;
                        this.gender=todos[i].gender;
                        this.team=todos[i].team;
                        this.rank=todos[i].rank;
                        this.role=todos[i].role;
                        this.cctvGroups=this.getCCTVs(todos[i].id)
                    }
                }
                this.userInfoModifyModal = !this.userInfoModifyModal;
            }else{
                alert("수정하실 사용자를 1명만 체크해 주세요")
            }
        },
        modifyUserInfo(id,firstName,lastName,gender,team,rank,role,inPassword){
            // if(id && firstName && lastName && team && rank && role){
                axios.post('http://localhost:8888/api/user/update',{
                    id:id,
                    firstName:firstName,
                    lastName:lastName,
                    gender:gender,
                    encryptedPassword:inPassword,
                    team:team,
                    rank:rank,
                    role:role,
                    // cctvGroups:this.cctvGroups
                }).then((res) => {
                    this.getTodos()
                    this.id = '',
                    this.firstName = '',
                    this.lastName = '',
                    this.gender = '',
                    this.team = '',
                    this.rank = '',
                    this.role = '',
                    this.cctvGroups=[];
                })
            // }
            this.selected=[]
            this.userInfoModifyModal = !this.userInfoModifyModal;
        },
        userInfoCancle(){ // Modal 창 닫기 버튼 함수
            this.id = '',
            this.firstName = '',
            this.lastName = '',
            this.name = '',
            this.gender = '',
            this.team = '',
            this.rank = '',
            this.role = '',
            this.selected=[],
            this.cctvGroups=[];
            if(this.userInfoModifyModal == true){
                this.userInfoModifyModal = false;
            }else if(this.userInfoSetModal == true){
                this.userInfoSetModal = false;
            }
        },
        deleteUserInfoBtn(todo){
            for(let i=0; i<todo.length; i++){
                axios.post('http://localhost:8888/api/user/delete',{
                    id: todo[i]
                })
                .then((res) => {
                    this.getTodos()
                })
            }
            this.selected=[]
        }
        ,
        addCCTVGroup(group){
          console.log("ggg>>", group);
            if(!this.isExist(group)){
                this.cctvGroups.push({name: group});
                this.cctvGroups.sort();
            }else{
                alert("이미 사용자가 속해있는 CCTV그룹입니다.");
            }
        },
        removeCCTV(index){
            this.cctvGroups.splice(index,1)
        },
        isExist(group){
            let returnFlag = false;
            for(let i in this.cctvGroups){
                if(this.cctvGroups[i] == group){
                    returnFlag = true;
                }
            }
            return returnFlag;
        }
    },
    mounted(){
        this.getUserLogin();
        this.getTodos();
        this.getCCTVGroupList();
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
