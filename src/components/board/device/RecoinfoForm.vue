<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
        <div class="title-wrapper">
        <span class="title"> 녹화장치 정보 </span>
            <span class="addContainer" @click="ShowInsertModal()">
                <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
            </span>
            <span class="addContainer" @click="ShowUpdateModal()">
                <i class="fas fa-pencil-alt" aria-hidden="true"></i>
            </span>
            <span class="addContainer" @click="delRecoInfo(checkedReco)">
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
                        <td><strong> 번호 </strong></td>
                        <td><strong> 서버이름 </strong></td>
                        <td><strong> IP 주소 </strong></td>
                        <td><strong> 업체명 </strong></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table1-body" v-for="(RecoInfo, i) in RecoInfos" :key="i" >
                    <th></th>
                    <td><input type="checkbox" :value="RecoInfo.id" v-model="checkedReco"></td>
                    <td> {{ i+1 }} </td>
                    <td> {{ RecoInfo.name }} </td>
                    <td> {{ RecoInfo.ip_address }} </td>
                    <td> {{ RecoInfo.vendor }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <RecoInsert v-if="InsertModal" @close="getRecoInfo(), InsertModal = false">
    </RecoInsert>

    <RecoUpdate :recoId.sync="recoId" :recoName.sync="recoName" :recoIP.sync="recoIP" :recoVendor.sync="recoVendor" v-if="UpdateModal" @close="UpdateModal = false" v-on:close="getRecoInfo()">
    </RecoUpdate>
</div>
</template>

<script>
import RecoInsert from '../device/Modals/RecoInsert';
import RecoUpdate from '../device/Modals/RecoUpdate.vue';
import axios from 'axios';

import SideBar from '../../common/SideBar.vue';

export default {
    components:{
        SideBar
    },
    // updated() {
    //     this.getRecoInfo()
    // },
    mounted() {
        this.getRecoInfo()
    },
    data() {
        return {
            InsertModal: false,
            UpdateModal: false,
            selectAll: false,
            RecoInfos:[],
            checkedReco:[],
            recoId: '',
            recoName: '',
            recoIP : '',
            recoVendor : '',
        }
    },
    methods: {
        checkAll() {
            this.checkedReco = [];
            if(!this.selectAll) {
                for(let i in this.RecoInfos) {
                    this.checkedReco.push(this.RecoInfos[i].id)
                }
            }
        },
        getRecoInfo () {
            if(this.RecoInfos.length > 0) {
                this.RecoInfos = []; 
            }

            axios.get('http://localhost:8888/api/recoding/list')
            .then((res) => {
                this.RecoInfos = res.data.data
            })
        },
        delRecoInfo (checkedReco) {
            if(checkedReco.length == 0)
            {
                alert('녹화장치를 선택하세요')
            }
            else {
                for(let i = 0; i < checkedReco.length; i++)
                {
                    axios.post('http://localhost:8888/api/recoding/delete', {
                        id: checkedReco[i]
                    })
                    .then((res) => {
                        this.getRecoInfo()
                    })
                }
            }
            
            
            this.checkedReco = [];
        },
        ShowInsertModal() {
            this.InsertModal = !this.InsertModal;
        },
        ShowUpdateModal() {
            if(0 == this.checkedReco.length)  {
                alert('녹화장치를 선택해주세요.')
            }
            else if (this.checkedReco.length > 1) {
                alert('녹화장치를 하나만 선택해주세요.')
            }
            else {
                this.recoId = this.checkedReco[0];
                for(let i = 0; i < this.RecoInfos.length; i++) {
                    if(this.recoId == this.RecoInfos[i].id) {
                        this.recoName = this.RecoInfos[i].name;
                        this.recoIP = this.RecoInfos[i].ip_address;
                        this.recoVendor = this.RecoInfos[i].vendor
                    }
                }
                this.UpdateModal = !this.UpdateModal;
            }
        }
    },
    components: {
        RecoInsert: RecoInsert,
        RecoUpdate: RecoUpdate,
        SideBar,
    },
}
</script>


<style scoped>
</style>
