<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <span class="modal-header-title"> CCTV 그룹 수정 </span>
            </slot>
          </div>
          <div class="modal-body">
            <div class="modal-body-title"> 기본정보 </div>
            <table class="modal-table">
              <colgroup>
                <col width="40%">
                <col width="60%">
              </colgroup>
              <tbody>
                <tr class="modal-table-body">
                  <td> 이름 </td>
                  <td><input type="text" v-model="name" placeholder="그룹 이름 입력"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <span name="footer">
              <button class="button-cancle" @click="$emit('close')">취소</button>
              <button class="button-add" @click="updateGroupData(name), $emit('close')" >추가</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  props : {
    group_id: {
      type: Number,
      required: true
    }
  },
  data() {
        return {
            groupData: [],
            name: '',
        }
  },
  mounted() {
    this.getGroupData()
  },
  methods: {
    getGroupData () {
      this.$http.get('http://localhost:3000/cctvgroup_infos/'+this.group_id)
      .then((res) => {
          this.name = res.data.name;
      })
    },
    updateGroupData(name) {
        if(name){
            this.$http.patch('http://localhost:3000/cctvgroup_infos/'+this.group_id, {
            name: name
            })
            .then((res) => {
            this.groupData.push(res.data);
            })
        }
    },
  }
}
</script>



<style lang="css">
.closeModalBtn {
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
  height: 300px;
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
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
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
}
</style>
<style scoped>
.modal-container {
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
}
</style>