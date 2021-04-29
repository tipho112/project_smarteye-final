<template>
<div>
  <SideBar></SideBar>
  <div id="content">
      <div class="title-wrapper">
          <span class="title">지역별 카메라 상황</span>
      </div>
      <table class="condition-table">
              <colgroup>
                <col width="15%">
              </colgroup>
              <tbody>
                <tr class="condition-table-body">
                  <td>검색기간</td>
                  <td>
                    <input type="date" v-model="firstDate"/><input type="time" v-model="firstTime"/> ~
                    <input type="date" v-model="lastDate"/><input type="time" v-model="lastTime"/>
                    <!-- {{firstDate + " " + firstTime}}
                    {{lastDate + " " + lastTime}} -->
                  </td>
                </tr>

                        <tr class="condition-table-body">
                          <td>CCTV</td>
                          <td>
                            <select name="selectingCCTV" v-model="cctvId">
                                    <option v-for="(cctvs, index) in CCTVInfos" :key="index" v-bind:value="cctvs.idString">
                                        {{cctvs.name}}
                                    </option>
                                </select>
                            <button class="button-add" v-on:click="addCameraList(cctvId)">추가</button>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <span class="groupbutton" v-for="(cctv,index) in cctvsNameArr" :key="cctv">
                              {{cctv}}
                              <span class="groupremove" type="button" v-on:click="removeCCTV(index)">
                                  <i class="closeBtn fas fa-times"></i>
                              </span>
                            </span>
                          </td>
                        </tr>

                  <tr class="condition-table-body">
                  <td>
                    <button class="button-add" v-on:click="searchObjectArea(firstDate,firstTime,lastDate,lastTime)">조회</button>
                  </td>
                  <td></td>
                  </tr>
              </tbody>
        </table>
        <div>
          <google-map class="googleMap">
            <div slot-scope="{ google, map }">
              <google-map-marker
                :google="google"
                :map="map"
                :position="position">
              </google-map-marker>
            </div>
          </google-map>
        </div>
  </div>
</div>
</template>
<script>
import SideBar from '../../common/SideBar.vue'
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
    components:{
        SideBar
    },
    props: {
    mapConfig: Object,
    apiKey: "AIzaSyAXHPv-NrUNy7TOE0CuAg5JN04fg6IRJLU",
    },
   data () {
      return {
        position: {
          lat: 37,
          lng: 127
        },
        CCTVInfos:[],
        firstDate:'',
        lastDate:'',
        firstTime:'',
        lastTime:'',
        cctvsIdArr:[],
        cctvsNameArr:[],
        cctvId:'',
      }
    },
    methods:{
      initializeMap() {
        const mapContainer = this.$refs.googleMap
        this.map = new this.google.maps.Map(
          mapContainer, this.mapConfig
        )
      },
      getCameraList() {
        axios.get('http://localhost:8888/api/cctv/list')
            .then((res) => {
                this.CCTVInfos = res.data.data
            })
      },
      searchObjectArea(firstDate,firstTime,lastDate,lastTime){
            this.searchData.splice(0)
            this.chartArr = [];  // 차트에 들어가는 수 초기화 // 추가해줌!!
            let fDateTime = firstDate+" "+firstTime
            let lDateTime = lastDate+" "+lastTime
            if(!firstDate&&!firstTime&&!lastDate&&!lastTime){
                alert("기간을 입력하세요")
            }else{
                for(let i=0; i<this.areaArr.length; i++){
                    this.searchData.push({
                        car : 0,
                        carPercent:0,
                        person : 0,
                        personPercent:0,
                        flame : 0,
                        smoke : 0,
                        sum : 0,
                        area : this.areaArr[i]
                    })
                }
                for(let i=0; i<this.searchData.length; i++){
                    for(let j=0; j<this.getObjectAreaData.length; j++){
                        if(this.isbetweenDate(fDateTime,lDateTime,this.getObjectAreaData[j].created_at)
                        && this.areaArr[i]==this.getObjectAreaData[j].area1+" "+this.getObjectAreaData[j].area2){
                            for(let k=0; k<this.objectArr.length; k++){
                                if((this.objectArr.length>0) && (this.objectArr[k]=="차") && (this.getObjectAreaData[j].car == "o")){
                                    this.searchData[i].car++;
                                    this.searchData[i].sum++;
                                }
                                if((this.objectArr.length>0) && (this.objectArr[k]=="사람") && this.getObjectAreaData[j].person == "o"){
                                    this.searchData[i].person++;
                                    this.searchData[i].sum++;
                                }
                                if((this.objectArr.length>0) && (this.objectArr[k]=="화제") && this.getObjectAreaData[j].flame == "o"){
                                    this.searchData[i].flame++;
                                    this.searchData[i].sum++;
                                }
                                if((this.objectArr.length>0) && (this.objectArr[k]=="연기") && this.getObjectAreaData[j].smoke == "o"){
                                    this.searchData[i].smoke++;
                                    this.searchData[i].sum++;
                                }
                            }
                            this.searchData[i].carPercent = (this.searchData[i].car/this.searchData[i].sum*100).toFixed(2)
                            this.searchData[i].personPercent = (this.searchData[i].person/this.searchData[i].sum*100).toFixed(2)
                        }
                    }
                }
            }
            // this.chartArr = [];  // 차트에 들어가는 수 초기화 // 추가해줌!!
            // 차트를 위한 데이터 입력
            for( let i=0; i<this.searchData.length; i++){
                this.chartArr.push({
                    car: this.searchData[i].car,
                    person: this.searchData[i].person
                })
            }
            this.chartDataPush()
      },
      addCameraList(cctvId){
            if(!this.isExistCamera(cctvId)){
                this.cctvsIdArr.push(cctvId);
                for(var i=0; i<this.getCCTVs.length; i++){
                    if(cctvId==this.getCCTVs[i].id){
                        this.cctvsNameArr.push(this.getCCTVs[i].name);
                    }
                }
            }else{
                alert("이미 선택한 CCTV그룹입니다.");
            }
        },
      isExistCamera(cctvId){
            var returnFlag = false;
            for(var i in this.cctvsIdArr){
                if(this.cctvsIdArr[i] == cctvId){
                    returnFlag = true;
                }
            }
            return returnFlag;
        },
    },
    async mounted() {
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: this.apiKey
          })
        this.google = googleMapApi
        this.initializeMap()
        this.getCameraList()
    }
}
</script>
<style lang="">
.googleMap {
  height: 650px;
}
</style>
